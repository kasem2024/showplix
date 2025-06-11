import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  try {
    // 1. Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // 3. Get user ID from token
    const userId = decoded.id;

    // 4. Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { portfolio: true }, // Include related data if needed
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 5. Return user data
    return NextResponse.json({ status: 200, data: user });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {

    const { title, bio, projects, template, userId } = await req.json();
    console.log(userId , bio , title ,projects)
    const portfolio = await prisma.portfolio.create({
      data: {
        title , bio , projects , template , userId
      },
    });

    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    console.error("Create Portfolio Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, bio, projects, template } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        bio,
        projects,
        template,
      },
    });

    return NextResponse.json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    console.error('Update Portfolio Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Delete Portfolio Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
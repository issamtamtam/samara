import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { writeKnowledgeFile } from "@/lib/ai/knowledge-base";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type - only accept .txt files
    const fileName = (formData.get("fileName") as string) || file.name;
    
    if (!fileName.endsWith(".txt") && file.type !== "text/plain") {
      return NextResponse.json(
        { error: "Only .txt files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 1MB)
    if (file.size > 1_000_000) {
      return NextResponse.json(
        { error: "File size must be less than 1MB" },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();

    // Validate content is not empty
    if (!content.trim()) {
      return NextResponse.json(
        { error: "File is empty" },
        { status: 400 }
      );
    }

    // Save to knowledge.txt
    await writeKnowledgeFile(content);

    return NextResponse.json({
      success: true,
      message: "Knowledge base updated successfully",
      fileName: fileName,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // File info would be returned here if needed
    return NextResponse.json({
      message: "Admin API endpoint",
      endpoints: {
        post: "Upload .txt file to update knowledge base",
        get: "Get knowledge base info (not implemented)",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

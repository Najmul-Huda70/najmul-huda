import { db } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface Repository {
  label: string;
  url: string;
}

interface Project {
  _id: string;
  slug: string;
  title: string;
  status: string;
  year: number;
  type: string;
  category: string;
  short_description: string;
  description: string;
  featured: boolean;
  tags: string[];
  image: string[];
  repository: Repository[];
  live: string;
  metricValue?: string;
  metricLabel?: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};
    if (featured) query.featured = featured === "true";
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { short_description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }
    const projects = await db
      .collection<Project>("projects")
      .find(query)
      .sort({ year: -1 })
      .toArray();

    console.log("Fetched Projects Count:", projects.length);

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

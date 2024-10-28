// api/[data]/route.jsx
import { connectDB } from "@/config/connectDB";
import { NextResponse } from "next/server";
import Posts from "@/models/posts";

export const revalidate = 0;

export const GET = async (req, { params }) => {
  const { bucket } = await connectDB();

  const { data } = params;

  const files = await bucket
    .find({
      filename: data,
    })
    .toArray();

  // the resulat is an array and i take the first
  //element that i found
  const file = files[0];

  //reading file using openDownloadStreamByName
  const stream = bucket.openDownloadStreamByName(file.filename);

  return new NextResponse(stream, {
    Headers: { "Content-Type": file.contentType },
  });
};

export const DELETE = async (req, { params }) => {
  const { bucket } = await connectDB();

  try {
    const { data } = params;
    const deletedPost = await Posts.findByIdAndRemove(data);

    const files = await bucket
      .find({
        filename: deletedPost.imageUrl,
      })
      .toArray();

    // the resulat is an array and i take the first
    //element that i found
    const file = files[0];
    bucket.delete(file._id);
    return NextResponse.json({ msg: "ok" });
  } catch (e) {
    console.log(e);
  }
};

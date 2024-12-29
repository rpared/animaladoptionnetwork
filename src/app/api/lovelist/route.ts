// pages/api/lovelist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/config/connectDB";
import Lovelist from '@/models/lovelist';

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const adopterId = searchParams.get("adopterId");
    if (!adopterId) {
      return NextResponse.json({ success: false, message: 'Missing required field: adopterId' }, { status: 400 });
    }

    const lovelist = await Lovelist.find({ adopterId });
    return NextResponse.json({ success: true, lovelist });
  } catch (error) {
    console.error('Error fetching lovelist:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while fetching the lovelist.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { adopterId, animalId } = await req.json();
    if (!adopterId || !animalId) {
      return NextResponse.json({ success: false, message: 'Missing required fields: adopterId, animalId' }, { status: 400 });
    }

    // Check if the animal is already in the lovelist
    const existingEntry = await Lovelist.findOne({ adopterId, animalId });
    if (!existingEntry) {
    
    const newLovelistItem = new Lovelist({ adopterId, animalId });
    await newLovelistItem.save();
    return NextResponse.json({ success: true, lovelist: newLovelistItem }, { status: 201 });
    }
  } catch (error) {
    console.error('Error adding to lovelist:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while adding to the lovelist.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const adopterId = searchParams.get("adopterId");
    const animalId = searchParams.get("animalId");
    if (!adopterId || !animalId) {
      return NextResponse.json({ success: false, message: 'Missing required fields: adopterId, animalId' }, { status: 400 });
    }

    await Lovelist.findOneAndDelete({ adopterId, animalId });
    return NextResponse.json({ success: true, message: 'Animal removed from lovelist' });
  } catch (error) {
    console.error('Error removing from lovelist:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while removing from the lovelist.' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/db/users';

// 특정 사용자 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다.',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('User fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '사용자 조회 실패',
    }, { status: 500 });
  }
}

// 사용자 정보 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    await updateUser(id, updateData);

    const updatedUser = await getUserById(id);

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('User update error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '사용자 업데이트 실패',
    }, { status: 500 });
  }
}

// 사용자 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteUser(id);

    return NextResponse.json({
      success: true,
      message: '사용자가 삭제되었습니다.',
    });
  } catch (error: any) {
    console.error('User deletion error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '사용자 삭제 실패',
    }, { status: 500 });
  }
}

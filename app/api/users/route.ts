import { NextRequest, NextResponse } from 'next/server';
import { createUser, getAllUsers, getUserByEmail } from '@/lib/db/users';

// 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // 이메일 중복 확인
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: '이미 존재하는 이메일입니다.',
      }, { status: 400 });
    }

    const user = await createUser({
      email: userData.email,
      name: userData.name,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('User creation error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '사용자 생성 실패',
    }, { status: 500 });
  }
}

// 사용자 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let result;
    if (email) {
      result = await getUserByEmail(email);
      if (!result) {
        return NextResponse.json({
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        user: result,
      });
    } else {
      result = await getAllUsers();
      return NextResponse.json({
        success: true,
        users: result,
      });
    }
  } catch (error: any) {
    console.error('User fetch error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || '사용자 조회 실패',
    }, { status: 500 });
  }
}

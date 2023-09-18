import { NavLink, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Avatar, Button, Input, Popover } from 'components'
import { PATH } from 'constant'
import { useAuth } from 'hooks'
import { useAppDispatch } from 'store'
import { quanLyNguoiDungActions } from 'store/quanLyNguoiDung'
import { useEffect, useState } from 'react'
import cn from 'classnames'

export const Header = () => {
    const navigate = useNavigate()
    const { accessToken, user } = useAuth()
    const dispatch = useAppDispatch()
    const [scroll, setSecroll] = useState<boolean>(false)
    console.log('scroll: ', scroll)

    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            setSecroll(true)
            return
        }
        setSecroll(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Container
            className={cn({
                'header-fixed': scroll,
            })}
        >
            <div className="header-content">
                <h1 className="brand">
                    <span className="text-[var(--primary-color)]">CYBER</span>MOVIE
                </h1>
                <div className="flex items-center gap-[60px]">
                    <nav>
                        <NavLink to="">LỊCH CHIẾU</NavLink>
                        <NavLink to="">PHIM</NavLink>
                        <NavLink to="">RẠP</NavLink>
                        <NavLink to="">TIN TỨC</NavLink>
                    </nav>
                    <div className="search">
                        <Input placeholder="Tìm kiếm tên phim" />
                        <Button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </div>
                    <div>
                        {!accessToken && (
                            <p className="flex items-center font-600">
                                <i className="fa-solid fa-user text-20"></i>
                                <span
                                    className="ml-10 cursor-pointer hover:text-[var(--primary-color)]"
                                    onClick={() => navigate(PATH.login)}
                                >
                                    Đăng nhập
                                </span>
                                <span className="inline-block h-[24px] w-[2px] bg-black mx-6"></span>
                                <span
                                    className="cursor-pointer hover:text-[var(--primary-color)]"
                                    onClick={() => navigate(PATH.register)}
                                >
                                    Đăng ký
                                </span>
                            </p>
                        )}
                        {!!accessToken && (
                            <Popover
                                content={
                                    <div className="p-10">
                                        <p className="font-600 text-16">{user?.hoTen}</p>
                                        <hr className="my-16" />
                                        <p
                                            className="text-16 cursor-pointer"
                                            onClick={() => navigate(PATH.account)}
                                        >
                                            Thông tin tài khoản
                                        </p>
                                        <hr className="my-16" />
                                        <Button
                                            className="!h-[46px]"
                                            type="primary"
                                            onClick={() =>
                                                dispatch(quanLyNguoiDungActions.logOut('abc'))
                                            }
                                        >
                                            <i className="fa-solid fa-arrow-right-from-bracket text-16"></i>
                                            <span className="ml-10 font-500 text-16">
                                                Đăng xuất
                                            </span>
                                        </Button>
                                    </div>
                                }
                                trigger="click"
                                arrow={false}
                            >
                                <Avatar size="large" className="!bg-[var(--primary-color)]">
                                    <i className="fa-regular fa-user text-20"></i>
                                </Avatar>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

// Styled component
const Container = styled.header`
    height: var(--header-height);
    box-shadow: 0px 16px 10px -5px rgba(0, 0, 0, 0.1);

    &.header-fixed {
        position: fixed;
        width: 100%;
        z-index: 999;
        background: #fff;
    }

    .header-content {
        padding: 0 40px;
        max-width: var(--max-width);
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .brand {
            font-weight: 700;
            font-size: 30px;
            &:hover {
                cursor: pointer;
            }
        }
        nav {
            display: flex;
            gap: 60px;
            a {
                font-weight: 500;
                &::after {
                    content: '';
                    display: block;
                    height: 3px;
                    background: var(--primary-color);
                    width: 0;
                    transition: all 0.3s ease-in-out;
                }
                &:hover {
                    &::after {
                        width: 100%;
                    }
                }
            }
        }

        .search {
            border: 1px solid #111;
            display: flex;
            align-items: center;
            border-radius: 6px;
            overflow: hidden;
            button {
                height: 46px !important;
                border: none;
                border-radius: initial;
                background: #111;
                color: #fff;
                &:hover {
                    color: var(--primary-color) !important;
                }
            }
        }

        input {
            margin-top: 0;
            background: transparent;
            color: #111;
            outline: none;
        }
    }
`

import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import { HeaderContainer } from "../header";
import { Button, Title } from "../../styles/theme";

const Header = (): ReactElement => {
    const navigete = useNavigate();

    const handleLogout = async (): Promise<void> => {
        try {
            const response = await axios.post(
                `${SPRING_API_URL}/api/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );

            localStorage.removeItem("token");
            alert(response.data.item);
            navigete("/");
        } catch (error) {
            console.error("An error occurred", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    const handleLogoClick = (): void => {
        navigete("/my-club-list");
    };

    return (
        <HeaderContainer>
            <Title cursor="pointer" hoverColor="true" onClick={handleLogoClick}>
                🌙 Travel Club
            </Title>
            <Button
                background="#bebebe"
                color="#505050"
                onClick={() => handleLogout()}
            >
                로그아웃
            </Button>
        </HeaderContainer>
    );
};

export default Header;

import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`;

export const Logo = styled.h1`
  font-weight: bold;
  color: #333;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #f15e2c;
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: 15px;
`;

export const SearchIcon = styled.span``;
export const CartIcon = styled.span``;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 15px 0;
  border-radius: 8px;
`;

export const MainText = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.div`
    height: 240px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 25px 60px 10px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  color: rgba(255, 255, 255, 0.9999);
`;

export const Subtitle = styled.p`
  font-size: 18px;
  margin-top: 10px;
  color: rgb(255, 255, 255, 0.4);
  height: 260;
`;

export const MainImage = styled.img`
  width: 40%;
  border-radius: 10px;
  object-fit: cover;
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

export const ProductCategories = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px 50px;
`;

export const Category = styled.div`
  flex: 1;
  text-align: center;
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

export const CategoryLabel = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: #333;
`;

export const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #f15e2c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

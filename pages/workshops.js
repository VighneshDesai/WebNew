import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  left : 50% ;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  left: 800px ;
  justify-content: center;
  
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  
  margin-bottom: 5px;
`;

const CartPageWrapper  = styled.div`
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      workshopType,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <CartPageWrapper>
            <ColumnsWrapper>
            
            {!!cartProducts?.length && (
                <Box>
                <h2>Book Your Workshop Now!</h2>
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Contact No."
                    value={contactno}
                    name="contactno"
                    onChange={(ev) => setContact(ev.target.value)}
                />
                <CityHolder>
                    <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                </CityHolder>
                <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                />
                <Select
                    value={workshopType}
                    onChange={(ev) => setWorkshopType(ev.target.value)}
                    
                >
                    <option value="">Workshop Type</option>
                    <option value="option1">Demonstrative</option>
                    <option value="option2">Hands-On</option>
                </Select>
                <Button black block onClick={goToPayment}>
                    Continue to payment
                </Button>
                </Box>
            )}
            
            </ColumnsWrapper>
        </CartPageWrapper>
      </Center>
    </>
  );
}

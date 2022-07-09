import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Container } from "./components/Container";
import { Message } from "./components/Message";
import { MyPets, AddPet } from "./components/pages/MyPets";
import { EditPet } from "./components/pages/EditPet";
//Pages
import { Home, Login, Register } from "./components/pages";
import { Profile } from "./components/pages/Profile";

//Context
import { UserProvider } from "./context/UserContext";
import { PetDetails } from "./components/pages/PetDetails";
import { MyAdoptions } from "./components/pages/MyAdoptions";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/pet/myadoptions" element={<MyAdoptions />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;

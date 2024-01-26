import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Nav';

import LocationList from './LocationList';
import LocationForm from './LocationForm';

import AttendeesList from './AttendeesList';
import AttendeeForm from './AttendeeForm.js';

import ConferenceForm from './ConferenceForm';
import PresentationForm from "./PresentationForm";

import MainPage from "./MainPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />

        <Route path="attendees" element={<AttendeesList />} />
        <Route path="attendees/new" element={<AttendeeForm />} />

        <Route path="/locations" element={<LocationList />} />
        <Route path="/locations/new" element={<LocationForm />} />

        <Route path="conferences/new" element={<ConferenceForm />} />

        <Route path="presentations/new" element={<PresentationForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

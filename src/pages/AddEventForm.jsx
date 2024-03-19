import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5173/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Event added successfully
      } else {
        // Handle error response
        console.error("Failed to add event:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding event:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="image">Image URL</FormLabel>
        <Input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="startTime">Start Time</FormLabel>
        <Input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="endTime">End Time</FormLabel>
        <Input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="categories">Categories (comma-separated)</FormLabel>
        <Input
          type="text"
          id="categories"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit">Add Event</Button>
    </form>
  );
};

export default AddEventForm;

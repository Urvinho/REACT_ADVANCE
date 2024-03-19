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
      const response = await fetch("http://localhost:3000/events", {
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
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Start Time</FormLabel>
        <Input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Categories (comma-separated)</FormLabel>
        <Input
          type="text"
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

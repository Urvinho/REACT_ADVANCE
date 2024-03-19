import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";

const EventPage = () => {
  const { eventId } = useParams();
  const history = useHistory(); // Get the history object to redirect after deleting event
  const [event, setEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categories: [],
    creator: {
      name: "",
      image: "",
    },
  });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State to control delete confirmation modal
  const toast = useToast(); // Initialize toast hook

  useEffect(() => {
    // Fetch event data for the specific eventId from the JSON server
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [eventId]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Event updated successfully
        // Show success toast
        toast({
          title: "Event updated",
          description: "The event details have been updated successfully.",
          status: "success",
          duration: 5000, // Toast duration in milliseconds
          isClosable: true,
        });
        setEvent(formData); // Update local state with the edited event data
        setIsOpen(false); // Close the modal
      } else {
        // Handle error response
        console.error("Failed to update event:", response.statusText);
        // Show error toast
        toast({
          title: "Error",
          description:
            "Failed to update event details. Please try again later.",
          status: "error",
          duration: 5000, // Toast duration in milliseconds
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
      // Show error toast
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        status: "error",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Event deleted successfully
        // Show success toast
        toast({
          title: "Event deleted",
          description: "The event has been deleted successfully.",
          status: "success",
          duration: 5000, // Toast duration in milliseconds
          isClosable: true,
        });
        // Redirect to the events list page
        history.push("/events");
      } else {
        // Handle error response
        console.error("Failed to delete event:", response.statusText);
        // Show error toast
        toast({
          title: "Error",
          description: "Failed to delete event. Please try again later.",
          status: "error",
          duration: 5000, // Toast duration in milliseconds
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
      // Show error toast
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        status: "error",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Heading>{event.title}</Heading>
      <Box>
        <Image src={event.image} alt={event.title} maxW="400px" maxH="400px" />
        <Text>Description: {event.description}</Text>
        <Text>Start Time: {event.startTime}</Text>
        <Text>End Time: {event.endTime}</Text>
        <Text>Categories: {event.categories.join(", ")}</Text>
        <Box>
          <Image
            src={event.creator.image}
            alt={event.creator.name}
            maxW="50px"
            maxH="50px"
          />
          <Text>Created by: {event.creator.name}</Text>
        </Box>
      </Box>
      <Button onClick={handleOpenModal}>Edit</Button>
      <Button
        colorScheme="red"
        ml={2}
        onClick={() => setIsDeleteConfirmOpen(true)}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Description:
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <Button type="submit">Save Changes</Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this event?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Yes, delete
            </Button>
            <Button ml={2} onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventPage;

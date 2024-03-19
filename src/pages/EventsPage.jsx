import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  List,
  ListItem,
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
  Select,
  useToast,
} from "@chakra-ui/react";
import AddEventForm from "./AddEventForm";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch events data from the JSON server
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
    if (e.target.value === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.categories.includes(e.target.value)
      );
      setFilteredEvents(filtered);
    }
  };

  const showToast = (status, title, description) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Heading>List of Events</Heading>
      <Button onClick={handleOpenModal}>Add Event</Button>
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearch}
        mt={4}
      />
      <Select
        placeholder="Filter by category"
        value={filterCategory}
        onChange={handleFilter}
        mt={2}
      >
        <option value="All">All</option>
        <option value="Music">Music</option>
        <option value="Sport">Sport</option>
        {/* Add more categories as needed */}
      </Select>
      <List mt={4}>
        {filteredEvents.map((event) => (
          <ListItem key={event.id}>
            <Link to={`/events/${event.id}`}>
              <Box>
                <Heading as="h2" size="md">
                  {event.title}
                </Heading>
                <Text>{event.description}</Text>
                <Image
                  src={event.image}
                  alt={event.title}
                  maxW="200px"
                  maxH="200px"
                />
                <Text>Start Time: {event.startTime}</Text>
                <Text>End Time: {event.endTime}</Text>
                <Text>Categories: {event.categories.join(", ")}</Text>
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm
              showToast={showToast}
              onCloseModal={handleCloseModal}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventsPage;

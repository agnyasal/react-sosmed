import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import { FiHome, FiBell, FiMessageSquare, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: FiHome, label: "Home", url: "/" },
  { icon: FiBell, label: "Notifications", url: "/notification" },
  { icon: FiMessageSquare, label: "Messages", url: "/messages" },
  { icon: FiUser, label: "Profile", url: "/profile" },
];

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  return (
    <Box h="full">
      {sidebarItems.map((item, index) => {
        return (
          <Flex
            key={index}
            align="center"
            w="full"
            py="4"
            borderRadius="md"
            onClick={() => navigate(item.url)}
            cursor="pointer"
            _hover={{ bg: "blackAlpha.600" }}
          >
            <Icon as={item.icon} fontSize="lg" />
            <Text ml="4" fontSize="18px">
              {item.label}
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Sidebar;

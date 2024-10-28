import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useMemo, useState } from "react";
import DeleteModal from "../../components/Modal/DeleteModal";
import LogoutModal from "../../components/Modal/LogoutModal";
import FormContact from "../../components/Form/FormContact";
import { deleteUser, getInfoUser, logoutUser } from "../../utils/localStorage";
import Map from "../../components/Map";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [openContact, setOpenContact] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [cep, setCep] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [ascedingSortSearch, setAscedingSortSearch] = useState(true);

  const navigate = useNavigate();

  const changeSortSearch = () => {
    setAscedingSortSearch(!ascedingSortSearch);
  };

  const getContacts = () => {
    const email = getInfoUser();
    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");
    return contacts[email] || [];
  };

  const contactsByUser = getContacts();

  const handleContact = () => {
    setOpenContact(true);
  };

  const handleLogout = () => {
    setOpenLogout(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = (set: any) => {
    set(false);
  };

  const getCep = (contact: any) => {
    setCep(contact.cep);
  };

  const filteredContacts = useMemo(() => {
    return contactsByUser
      .filter((contact: any) => {
        return (
          contact.name.toLowerCase().includes(searchContact.toLowerCase()) ||
          contact.cpf.includes(searchContact)
        );
      })
      .sort((a: any, b: any) => {
        if (ascedingSortSearch) {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
  }, [contactsByUser, searchContact, ascedingSortSearch]);

  const handleEdit = (cpf: string) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");

    if (!loggedInUser || !contacts[loggedInUser]) {
      return;
    }

    const contactToEdit = contacts[loggedInUser].find(
      (user: { cpf: string }) => user.cpf === cpf
    );
    if (contactToEdit) {
      // setFormData(contactToEdit as FormData);
    }
  };

  const verificaCpf = (cpf) => {
    if (cpf) {
      handleDeleteContacts(cpf);
    } else {
    }
  };

  const handleDeleteAccout = () => {
    const email = getInfoUser();
    deleteUser(email);
    logoutUser();
    navigate("/");
  };

  const handleDeleteContacts = (cpf: string) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");

    if (!loggedInUser || !contacts[loggedInUser]) {
      return;
    }

    // Remove o contato pelo CPF
    const updatedContacts = contacts[loggedInUser].filter(
      (user: { cpf: string }) => user.cpf !== cpf
    );
    contacts[loggedInUser] = updatedContacts;

    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box padding={1} display="flex" justifyContent="space-between">
        <Box>
          <Button onClick={handleContact}>Cadastrar novo contato</Button>
        </Box>
        <Box display="flex" gap={2}>
          <Button onClick={handleLogout}>Sair da conta</Button>
          <Button onClick={handleDelete}>Deletar sua conta</Button>
        </Box>
      </Box>
      <Box display="flex">
        <Box width="30%" minHeight="90vh" borderRight="1px solid #000">
          <Typography
            component="h4"
            textAlign="center"
            border="1px solid #000"
            borderRight="0"
          >
            Contatos
          </Typography>

          <Box
            py={2}
            px={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
            borderBottom={"1px solid #000"}
          >
            <TextField
              label="Procure pelo nome ou CPF"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchContact(e.target.value)}
            />
            <Tooltip
              title={`Alternar a listagem dos itens para ${
                ascedingSortSearch ? "decrescente" : "crescente"
              }`}
            >
              <IconButton onClick={changeSortSearch}>
                {ascedingSortSearch ? <ArrowUpward /> : <ArrowDownward />}
              </IconButton>
            </Tooltip>
          </Box>

          <Box overflow="auto" maxHeight="55%">
            {contactsByUser?.length > 0 &&
              filteredContacts?.map((contact: any, index: any) => (
                <Card
                  key={index}
                  variant="outlined"
                  onClick={() => getCep(contact)}
                  sx={{
                    margin: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    ":hover": {
                      cursor: "pointer",
                      border: "1px solid blue",
                    },
                    border: cep == contact?.cep ? "1px solid red" : "",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{contact.name}</Typography>
                    <Typography variant="body2">CPF: {contact.cpf}</Typography>
                    <Typography variant="body2">
                      Telefone: {contact.phone}
                    </Typography>
                    <Typography variant="body2">
                      Endereço: {contact.address}
                    </Typography>
                    <Typography variant="body2">CEP: {contact.cep}</Typography>
                    <Typography variant="body2">
                      Cidade: {contact.city}
                    </Typography>
                    <Typography variant="body2">
                      Estado: {contact.state}
                    </Typography>

                    {/* Add a delete button */}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click from being triggered
                        setOpenDelete(true);
                        handleDeleteContacts(contact.cpf);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click from being triggered
                        handleEdit(contact.cpf);
                      }}
                      color="warning"
                    >
                      <EditIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
        <Box width="70%">
          <Typography
            component="h4"
            textAlign="center"
            border="1px solid #000"
            borderLeft="0"
          >
            Mapa
          </Typography>

          <Box p={2}>
            <Map cep={cep} />
          </Box>
        </Box>
      </Box>

      <FormContact
        open={openContact}
        handleClose={() => handleClose(setOpenContact)}
      />
      <LogoutModal
        open={openLogout}
        handleClose={() => handleClose(setOpenLogout)}
      />
      <DeleteModal
        open={openDelete}
        handleClose={() => handleClose(setOpenDelete)}
        //  handleDelete={() => }
      />
    </Box>
  );
};

export default Dashboard;

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
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import DeleteModal from "../../components/Modal/DeleteModal";
import LogoutModal from "../../components/Modal/LogoutModal";
import FormContact from "../../components/Form/FormContact";
import { deleteUser, getInfoUser, logoutUser } from "../../utils/localStorage";
import Map from "../../components/Map";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { ContactType } from "../../types";

const Dashboard = () => {
  const [openContact, setOpenContact] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"user" | "contact" | null>(null);
  const [contactCPF, setContactCPF] = useState("");
  const [cep, setCep] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [ascedingSortSearch, setAscedingSortSearch] = useState(true);

  const navigate = useNavigate();
  const loggedInUser = getInfoUser();

  const changeSortSearch = () => {
    setAscedingSortSearch(!ascedingSortSearch);
  };

  const getContacts = () => {
    const email = getInfoUser();
    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");
    return contacts[email] || [];
  };

  const contactsByUser = getContacts();

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleOpenDelete = (type: "user" | "contact", cpf?: string) => {
    setDeleteType(type);
    if (type === "contact" && cpf) {
      setContactCPF(cpf);
    }
    setOpenDeleteModal(true);
  };

  const handleClose = (set: Dispatch<SetStateAction<boolean>>) => {
    set(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteType(null);
    setContactCPF("");
  };

  const getCep = (contact: ContactType) => {
    setCep(contact.cep);
  };

  const filteredContacts = useMemo(() => {
    return contactsByUser
      .filter((contact: ContactType) => {
        const withoutFormatterCpf = contact.cpf.replace(".", "");
        return (
          contact.name.toLowerCase().includes(searchContact.toLowerCase()) ||
          withoutFormatterCpf.includes(searchContact) ||
          contact.cpf.includes(searchContact)
        );
      })
      .sort((a: ContactType, b: ContactType) => {
        if (ascedingSortSearch) {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
  }, [contactsByUser, searchContact, ascedingSortSearch]);

  const handleDeleteAccount = () => {
    deleteUser(loggedInUser);
    logoutUser();
    navigate("/");
  };

  const handleDeleteContacts = () => {
    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");

    if (!contacts[loggedInUser]) {
      return;
    }

    const updatedContacts = contacts[loggedInUser].filter(
      (user: { cpf: string }) => user.cpf !== contactCPF
    );
    contacts[loggedInUser] = updatedContacts;

    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const handleDelete = () => {
    if (deleteType === "user") {
      handleDeleteAccount();
    } else if (deleteType === "contact") {
      handleDeleteContacts();
    }
    handleCloseDeleteModal();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box padding={1} display="flex" justifyContent="space-between">
        <Box>
          <Button onClick={handleOpenContact}>Cadastrar novo contato</Button>
        </Box>
        <Box display="flex" gap={2}>
          <Button onClick={handleOpenLogout}>Sair da conta</Button>
          <Button onClick={() => handleOpenDelete("user")}>
            Deletar sua conta
          </Button>
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

          <Box overflow="auto" minHeight="70%" maxHeight="70%">
            {contactsByUser?.length > 0 &&
              filteredContacts?.map((contact: ContactType, index: number) => {
                return (
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
                      <Typography variant="body2">
                        CPF: {contact.cpf}
                      </Typography>
                      <Typography variant="body2">
                        Telefone: {contact.phone}
                      </Typography>
                      <Typography variant="body2">
                        Endereço: {contact.address}
                      </Typography>
                      <Typography variant="body2">
                        CEP: {contact.cep}
                      </Typography>
                      <Typography variant="body2">
                        Cidade: {contact.city}
                      </Typography>
                      <Typography variant="body2">
                        Estado: {contact.state}
                      </Typography>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setContactCPF(contact.cpf);
                          handleOpenDelete("contact");
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setContactCPF(contact.cpf);
                          handleOpenContact();
                        }}
                        color="warning"
                      >
                        <EditIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                );
              })}
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
        cpfEditContact={contactCPF}
        removeCpfEditContact={setContactCPF}
      />
      <LogoutModal
        open={openLogout}
        handleClose={() => handleClose(setOpenLogout)}
      />
      <DeleteModal
        open={openDeleteModal}
        title={
          deleteType === "user"
            ? "Tem certeza de que deseja deletar sua conta?"
            : "Deseja deletar este contato?"
        }
        button={deleteType === "user" ? "Deletar a conta" : "Deletar o contato"}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Dashboard;

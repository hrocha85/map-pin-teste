import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { contactSchema } from "../../utils/validations/contactSchema";
import { z } from "zod";
import { isCpfValid } from "../../utils/cpfValidator";

interface FormContactProps {
  open: boolean;
  handleClose: () => void;
}

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  city: string;
  state: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 500,
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface FormErrors {
  [key: string]: string[];
}

const FormContact = ({ open, handleClose }: FormContactProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    phone: "",
    cep: "",
    address: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const isDisabledButton =
    !formData.name ||
    !formData.cpf ||
    !formData.phone ||
    !formData.address ||
    !formData.cep;

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        cpf: "",
        phone: "",
        cep: "",
        address: "",
        city: "",
        state: "",
      });
      setErrors({});
    }
  }, [open]);

  const addContactToLocalStorage = (contact: FormData) => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      console.error("Nenhum usuário está logado.");
      return;
    }

    const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");

    if (!contacts[loggedInUser]) {
      contacts[loggedInUser] = [];
    }

    const userContacts = contacts[loggedInUser];

    const cpfDuplicated = userContacts.find(
      (user: any) => user.cpf === contact.cpf
    );

    if (cpfDuplicated) {
      console.error("CPF já cadastrado.");
      setErrors((prev) => ({
        ...prev,
        cpf: ["CPF já cadastrado."],
      }));
      return false;
    }

    userContacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    console.log("Contato adicionado:", contact);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cpf" && errors.cpf) {
      setErrors((prev) => {
        const { cpf, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = () => {
    if (!isCpfValid(formData.cpf)) {
      setErrors((prev) => ({
        ...prev,
        cpf: ["CPF inválido"],
      }));
      return;
    }

    try {
      contactSchema.parse(formData);
      const isAdded = addContactToLocalStorage(formData);

      if (isAdded) {
        handleClose();
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.flatten();
        setErrors(formattedErrors.fieldErrors as FormErrors);
      }
    }
  };

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          console.error("CEP não encontrado.");
          setErrors({ cep: ["CEP não encontrado."] });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length === 8) {
      cleanedValue = cleanedValue.slice(0, 5) + "-" + cleanedValue.slice(5);
    }

    setFormData({ ...formData, [name]: cleanedValue });

    if (errors.cep) {
      setFormData((prev) => ({
        ...prev,
        address: "",
        city: "",
        state: "",
      }));

      setErrors((prev) => {
        const { cep, ...rest } = prev;
        return rest;
      });
    }

    if (name === "cep") {
      fetchAddressByCep(cleanedValue);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 14) {
      cleanedValue = cleanedValue.replace(/(\d{3})(?=\d)/g, "$1.");
      if (cleanedValue.length === 7) {
        cleanedValue += ".";
      }
      if (cleanedValue.length === 11) {
        cleanedValue += "-";
      }
    }

    setFormData({ ...formData, cpf: cleanedValue });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let cleanedValue = value.replace(/\D/g, ""); // Remove todos os caracteres que não são números

    // Formata o número no padrão de celular brasileiro: (13) 99176-4000
    if (cleanedValue.length <= 11) {
      if (cleanedValue.length > 2) {
        cleanedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
      }
      if (cleanedValue.length > 8) {
        cleanedValue = `${cleanedValue.slice(0, 10)}-${cleanedValue.slice(10)}`;
      }
    }

    setFormData({ ...formData, phone: cleanedValue });
  };

  const generateLabel = (key: string): string => {
    switch (key) {
      case "name":
        return "Nome:";
      case "cpf":
        return "CPF:";
      case "phone":
        return "Telefone:";
      case "cep":
        return "CEP:";
      case "address":
        return "Endereço:";
      case "city":
        return "Cidade:";
      case "state":
        return "Estado:";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  const maxLengths: { [key: string]: number } = {
    name: 100,
    cpf: 14,
    phone: 15,
    cep: 8,
    address: 200,
    city: 100,
    state: 2,
  };

  const generateChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maxLength = maxLengths[key] || 0; // Obtém o valor de maxLength, se existir, caso contrário usa 0

    if (e.target.value.length > maxLength) {
      return; // Impede a entrada de mais caracteres do que o maxLength
    }

    if (key === "cep") {
      return handleCepChange(e);
    } else if (key === "cpf") {
      return handleCpfChange(e);
    } else if (key === "phone") {
      return handlePhoneChange(e);
    } else {
      return handleChange(e);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "grey.600" }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" component="h2" align="center">
          Adicionar Novo Contato
        </Typography>
        <Stack spacing={2} mt={2}>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              label={generateLabel(key)}
              name={key}
              value={formData[key as keyof FormData]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                generateChange(key, e)
              }
              error={!!errors[key]}
              helperText={errors[key] ? errors[key].join(", ") : ""}
              fullWidth
              disabled={key == "address" || key == "city" || key == "state"}
            />
          ))}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isDisabledButton}
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            Adicionar Contato
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FormContact;

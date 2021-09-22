import styles from "./UsersTable.module.scss";

import defaultUserPicture from "../../../assets/img/defaultUserPicture.png";

import { useRef, useState, useEffect } from "react";
import { useToast } from "../../../hooks/useToast";

import { UsuarioService } from "../../../services/UsuarioService";

import { Link, useRouteMatch } from "react-router-dom";
import { CsvReader } from "../../CsvReader/CsvReader";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export function UsersTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ nombre: "" });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const toast = useToast();

  const dt = useRef(null);

  let match = useRouteMatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UsuarioService.listarUsuarios();
      setUsuarios(response);
    };
    fetchUsers();
    setUpdateTable(false);
  }, [updateTable]);

  const cols = [
    { field: "nombre", header: "Nombre" },
    { field: "celular", header: "Celular" },
    { field: "correo", header: "Correo" },
    { field: "rol", header: "Rol" },
  ];

  const csvImportCols = ["nombre", "celular", "correo", "rol"];
  const numberCols = [];

  const imageBodyTemplate = (usuario) => {
    return (
      <img
        src={usuario.imagen !== "" ? usuario.imagen : defaultUserPicture}
        alt={usuario.nombre}
        className={styles.tablePicture}
      />
    );
  };

  const actionsBodyTemplate = (usuario) => {
    return (
      <>
        <Link
          className={`btn btn-azulClaro px-3 mx-2`}
          to={"/usuarios/editar/" + usuario.id}
        >
          Editar
        </Link>
        <button className={`btn btn-rojo`} onClick={() => onDelete(usuario)}>
          Eliminar
        </button>
      </>
    );
  };

  const onDelete = (usuario) => {
    setSelectedUser(usuario);
    setShowDeleteDialog(true);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const deleteUser = () => {
    const wasDeleted = UsuarioService.eliminarUsuario(selectedUser);
    if (wasDeleted) {
      toast("success", "Usuario eliminado exitosamente");
    } else {
      toast("danger", "No se pudo eliminar el usuario");
    }
    setShowDeleteDialog(false);
    setUpdateTable(true);
  };

  return (
    <div className={styles.usersTable}>
      <div className={styles.header}>
        <CsvReader
          importFunction={UsuarioService.importarUsuarios}
          csvImportCols={csvImportCols}
          numberCols={numberCols}
          updateTable={setUpdateTable}
        />
        <Link
          to={`${match.path}/registrar`}
          className={`btn btn-verde ${styles.btnAgregar}`}
        >
          Registrar usuario
        </Link>
      </div>
      <CustomDataTable
        value={usuarios}
        dt={dt}
        cols={cols}
        filename="Usuarios"
        ref={dt}
      >
        <Column
          field="nombre"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="Buscar por nombre"
        />
        <Column body={imageBodyTemplate} header="Foto" />
        <Column field="celular" header="Celular" sortable />
        <Column field="correo" header="Correo" sortable />
        <Column field="rol" header="Rol" sortable />
        <Column body={actionsBodyTemplate} />
      </CustomDataTable>

      <ConfirmDialog
        show={showDeleteDialog}
        cancel={cancelDelete}
        type="delete"
        message={`¿Desea eliminar al usuario ${selectedUser.nombre}?`}
        confirm={deleteUser}
      />
    </div>
  );
}

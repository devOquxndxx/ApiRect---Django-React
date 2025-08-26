import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';


const ListaAlumnos = () => {
    // Aca almacenamos los alumnos
    const [alumnos, setAlumnos] = useState([]);

    // Estado para manejar carga de datos 
    const [loading, setLoading] = useState(true);

    // Estado para manejar errores al cargar los datos
    const [error, setError] = useState(null);


    // Estado para mostrar alertas al eliminar un alumno
    const [deleteAlert, setDeleteAlert] = useState(null);


    // Tamaño de los iconos para las acciones
    const iconSize = 20;

    // Hook useEffect: carga la lista de alumnos al montar el componente
    useEffect(() => {
        fetchAlumnos(); // Llama a la función para obtener los alumnos
    }, []);

        // Hook useEffect: carga la lista de alumnos al montar el componente
    useEffect(() => {
        fetchAlumnos(); // Llama a la función para obtener los alumnos
    }, []);


    // Función para obtener la lista de alumnos desde la API
    const fetchAlumnos = async () => {
        setLoading(true); // Indica que los datos están cargando
        setError(null); // Reinicia el estado de error
        try {
            // Realiza una solicitud GET para obtener los alumnos
            const response = await axios.get('http://127.0.0.1:8000/api/alumnos/');
            setAlumnos(response.data); // Actualiza el estado con los datos obtenidos
        } catch (err) {
            // Maneja errores al cargar los datos
            setError(err.message || 'Error al obtener alumnos.');
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };


    // Función para eliminar un alumno
    const handleDelete = async (id) => {
        // Confirma si el usuario desea eliminar el alumno
        if (window.confirm("¿Estás seguro de eliminar este alumno?")) {
            try {
                // Realiza una solicitud DELETE para eliminar el alumno
                await axios.delete(`http://127.0.0.1:8000/api/alumnos/${id}/`);
                // Muestra una alerta de éxito
                setDeleteAlert({ variant: 'success', message: 'Alumno eliminado exitosamente!' });
                fetchAlumnos(); // Recarga la lista de alumnos después de eliminar
                setTimeout(() => setDeleteAlert(null), 3000); // Oculta la alerta después de 3 segundos
            } catch (err) {
                // Maneja errores al eliminar el alumno
                setDeleteAlert({ variant: 'danger', message: err.message || 'Error al eliminar alumno.' });
                setTimeout(() => setDeleteAlert(null), 3000); // Oculta la alerta después de 3 segundos
            }
        }
    };


    // Muestra un mensaje de carga mientras se obtienen los datos
      if (loading) {
        return <div>Cargando alumnos...</div>;
    }

    // Muestra un mensaje de error si ocurre un problema al cargar los datos
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    
    
    return (
        <div>
            {/* Título de la página */}
            <h2 className="">Lista de Alumnos</h2>


            {/* Botón para crear un nuevo alumno */}
            <Link to="/crear" className="btn btn-primary mb-3">Crear Nuevo Alumno</Link>


            {/* Alerta condicional: se muestra si hay un mensaje en deleteAlert */}
            {deleteAlert && <Alert variant={deleteAlert.variant}>{deleteAlert.message}</Alert>}

            {/* Tabla para mostrar la lista de alumnos */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Nota 1</th>
                        <th>Nota 2</th>
                        <th>Nota 3</th>
                        <th>Promedio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapea los alumnos y genera una fila para cada uno */}
                    {alumnos.map(alumno => (
                        <tr key={alumno.id}>
                            <td>{alumno.id}</td>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.numero_documento}</td>
                            <td>{alumno.nota1}</td>
                            <td>{alumno.nota2}</td>
                            <td>{alumno.nota3}</td>
                            <td>{alumno.promedio ? alumno.promedio.toFixed(2) : 'N/A'}</td>
                            <td className="d-flex gap-2"> {/* Usa flex para alinear los iconos */}
                                {/* Botón para editar el alumno */}
                                <Link to={`/editar/${alumno.id}`} className="btn btn-warning btn-sm">
                                    <FaEdit size={iconSize} /> {/* Icono de editar */}
                                </Link>
                                {/* Botón para eliminar el alumno */}
                                <Button variant="danger" btn-sm onClick={() => handleDelete(alumno.id)}>
                                    <FaTrash size={iconSize} /> {/* Icono de eliminar */}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}


export default ListaAlumnos;
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';

const EditarAlumno = () => {
    const { id } = useParams(); // obtener el id del alumno desde los parametros de la URL

    // hook para redireccionar
    const navigate = useNavigate();

    const [alumno, setAlumno] = useState({
        nombre: '',
        numero_documento: '',
        nota1: '',
        nota2: '',
        nota3: '',
    })

    // estado para manejar la carga de datos 
    const [loading, setLoanding] = useState(true);

    // estado para manejar errores 
    const [error, setError] = useState(null);

    // estado para manejar mensajes de alerta
    const [showAlert, setShowAlert] = useState(null);

    //hook para cargar los datos del alumno al momento de actualizar el alumno
    useEffect(() => {
        const fetchAlumno = async () => {
            setLoanding(true);
            setError(null);
            try {
                // obtener los datos del alumno desde el backend
                const response = await axios.get(`http://127.0.0.1:8000/api/alumnos/${id}/`);
                setAlumno(response.data);
            } catch (error) {
                console.error("Error cargando alumno:", error);
                setError('Error cargando alumno. Por favor, intente de nuevo.');
            } finally {
                setLoanding(false); // finaliza el estado de carga
            }
        };
        fetchAlumno();
    }, [id]); // se vuelve a ejecutar si cambia el id

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        // Actualiza el estado del formulario con el valor ingresado
        setAlumno({ ...alumno, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Realiza una solicitud PUT para actualizar los datos del alumno
            await axios.put(`http://127.0.0.1:8000/api/alumnos/${id}/`, alumno);
            // Muestra una alerta de éxito
            setShowAlert({ variant: 'success', message: 'Alumno actualizado exitosamente!' });
            // Redirige al usuario a la página principal después de 1.5 segundos
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            // Maneja errores al actualizar los datos
            console.error("Error al actualizar alumno:", err);
            setShowAlert({ variant: 'danger', message: err.message || 'Error al actualizar el alumno.' });
        }
    };

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div>Cargando información del alumno...</div>;
    }

    // Muestra un mensaje de error si ocurre un problema al cargar los datos
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }


    return (
        <div className="">
            <h2>Editar Alumno</h2>

            {/* Alerta condicional: se muestra si hay un mensaje en showAlert */}
            {showAlert && (
                <Alert variant={showAlert.variant} onClose={() => setShowAlert(null)} dismissible>
                    {showAlert.message}
                </Alert>
            )}



            {/* Formulario para editar los datos del alumno */}
            <Form onSubmit={handleSubmit}>
                {/* Campo para el nombre del alumno */}
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={alumno.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                {/* Campo para el número de documento */}
                <Form.Group className="mb-3">
                    <Form.Label>Número de Documento</Form.Label>
                    <Form.Control
                        type="text"
                        name="numero_documento"
                        value={alumno.numero_documento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                {/* Campo para la Nota 1 */}
                <Form.Group className="mb-3">
                    <Form.Label>Nota 1</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="nota1"
                        value={alumno.nota1}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                {/* Campo para la Nota 2 */}
                <Form.Group className="mb-3">
                    <Form.Label>Nota 2</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="nota2"
                        value={alumno.nota2}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                {/* Campo para la Nota 3 */}
                <Form.Group className="mb-3">
                    <Form.Label>Nota 3</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="nota3"
                        value={alumno.nota3}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                {/* Botón para enviar el formulario */}
                <Button className="m-3" variant="primary" type="submit">Guardar Cambios</Button>


                {/* Enlace para cancelar y volver a la página principal */}
                <Link to="/" className="btn btn-secondary ml-2">Cancelar</Link>
            </Form>

        </div>
    );
};

export default EditarAlumno;
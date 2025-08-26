import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';

const CrearAlumno = () => {
    const [alumno, setAlumno] = useState({
        // los campos del alumno se cargan vacios al iniciar el formulario
        nombre: '',
        numero_documento: '',
        nota1: '',
        nota2: '',
        nota3: '',
    });

    // Hook para redireccionar
    const navigate = useNavigate();

    // Estado para manejar mensajes de alerta
    const [showAlert, setShowAlert] = useState(null);

    // manjejar el cambio en los inputs
    const handleChange = (e) => {
        setAlumno({ ...alumno, [e.target.name]: e.target.value });
    }

    // manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // enviar el alumno al backend
            const response = await axios.post('http://127.0.0.1:8000/api/alumnos/', alumno);
            // muestra mensaje de exito
            setShowAlert({ variant: 'success', message: 'Alumno creado exitosamente!' });
            // redireccionar a la lista de alumnos despues de 2 segundos
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            // muestra mensaje de error si falla
            console.error("Error creando alumno:", error);
            setShowAlert({ variant: 'danger', message: 'Error creando alumno. Por favor, intente de nuevo.' });
        }
    }

    return (
        <div className="">
            <h2>Crear Nuevo Alumno</h2>

            {/* se muestra alerta si hay mensaje en showAlert */}
            {showAlert && (
                <Alert variant={showAlert.variant} onClose={() => setShowAlert(null)} dismissible>
                    {showAlert.message}
                </Alert>
            )}

            {/* formulario para crear alumno */}
            <Form onSubmit={handleSubmit}>
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

                <Button className="m-3" variant="primary" type="submit">Crear</Button>
                <Link to="/" className="btn btn-secondary ml-2">Cancelar</Link>

            </Form>

        </div>
    );
};

export default CrearAlumno; 
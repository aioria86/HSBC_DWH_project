import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import KPIs from './KPIs';
import Graficos from './Graficos';

const VentasTable = () => {
  const [ventas, setVentas] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroProducto, setFiltroProducto] = useState('');
  const [filtroAño, setFiltroAño] = useState('');

  const [clientesUnicos, setClientesUnicos] = useState([]);
  const [productosUnicos, setProductosUnicos] = useState([]);
  const [añosUnicos, setAñosUnicos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/api/ventas/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error('Respuesta inesperada del backend:', data);
          return;
        }

        setVentas(data);

        const clientes = [...new Set(data.map(v => `${v.cliente.nombre} (${v.cliente.segmento})`))];
        const productos = [...new Set(data.map(v => `${v.producto.nombre} (${v.producto.categoria})`))];
        const años = [...new Set(data.map(v => new Date(v.tiempo.fecha).getFullYear()))].sort((a, b) => b - a);

        setClientesUnicos(clientes);
        setProductosUnicos(productos);
        setAñosUnicos(años);
      })
      .catch(err => console.error('Error al obtener ventas:', err));
  }, []);

  const ventasFiltradas = Array.isArray(ventas) ? ventas.filter(v => {
    const cliente = `${v.cliente.nombre} (${v.cliente.segmento})`;
    const producto = `${v.producto.nombre} (${v.producto.categoria})`;
    const año = new Date(v.tiempo.fecha).getFullYear();

    return (
      (filtroCliente === '' || cliente === filtroCliente) &&
      (filtroProducto === '' || producto === filtroProducto) &&
      (filtroAño === '' || año.toString() === filtroAño)
    );
  }) : [];

  const exportarCSV = () => {
    const encabezado = ['ID', 'Cantidad', 'Total', 'Cliente', 'Producto', 'Fecha'];
    const filas = ventasFiltradas.map(v => [
      v.id,
      v.cantidad,
      v.total,
      `${v.cliente.nombre} (${v.cliente.segmento})`,
      `${v.producto.nombre} (${v.producto.categoria})`,
      v.tiempo.fecha
    ]);

    const contenido = [encabezado, ...filas]
      .map(fila => fila.map(valor => `"${valor}"`).join(','))
      .join('\n');

    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.setAttribute('download', 'ventas_filtradas.csv');
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  };

  return (
    <div className="container mt-5">
      <KPIs ventas={ventasFiltradas} />

      <Form className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md>
            <Form.Label>Filtrar por Cliente</Form.Label>
            <Form.Select value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)}>
              <option value="">Todos los Clientes</option>
              {clientesUnicos.map((cliente, idx) => (
                <option key={idx} value={cliente}>{cliente}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md>
            <Form.Label>Filtrar por Producto</Form.Label>
            <Form.Select value={filtroProducto} onChange={(e) => setFiltroProducto(e.target.value)}>
              <option value="">Todos los Productos</option>
              {productosUnicos.map((producto, idx) => (
                <option key={idx} value={producto}>{producto}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md>
            <Form.Label>Filtrar por Año</Form.Label>
            <Form.Select value={filtroAño} onChange={(e) => setFiltroAño(e.target.value)}>
              <option value="">Todos los Años</option>
              {añosUnicos.map((año, idx) => (
                <option key={idx} value={año}>{año}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="outline-primary" onClick={exportarCSV}>Exportar CSV</Button>
          </Col>
        </Row>
      </Form>

      <h4 className="mb-3">Listado de Ventas</h4>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.id}</td>
              <td>{venta.cantidad}</td>
              <td>€ {venta.total}</td>
              <td><strong>{venta.cliente.nombre}</strong><br /><small>({venta.cliente.segmento})</small></td>
              <td><strong>{venta.producto.nombre}</strong><br /><small>({venta.producto.categoria})</small></td>
              <td>{venta.tiempo.fecha}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Graficos ventas={ventasFiltradas} />
    </div>
  );
};

export default VentasTable;

-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2019 a las 05:44:32
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autoevaluaciong6`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `idAlumno` int(11) NOT NULL,
  `nroLegajo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `idCarrera` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreraalumno`
--

CREATE TABLE `carreraalumno` (
  `idCarrera` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `idExamen` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `idInstanciaExamen` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenpregunta`
--

CREATE TABLE `examenpregunta` (
  `idModeloExamen` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historiconotas`
--

CREATE TABLE `historiconotas` (
  `idAlumno` int(11) NOT NULL,
  `idNotas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instanciaexamen`
--

CREATE TABLE `instanciaexamen` (
  `idInstanciaExamen` int(11) NOT NULL,
  `idModeloExamen` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modeloexamen`
--

CREATE TABLE `modeloexamen` (
  `idModeloExamen` int(11) NOT NULL,
  `idCarrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `idNotas` int(11) NOT NULL,
  `idTipoNota` int(11) NOT NULL,
  `notas` varchar(45) DEFAULT NULL,
  `idExamen` int(11) NOT NULL,
  `idCarrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `idPais` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `idPerfil` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`idPerfil`, `nombre`) VALUES
(1, 'Alumno'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `cuil` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `apellido`, `cuil`) VALUES
(1, 'naza', 'gal', '12121231233');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `idPregunta` int(11) NOT NULL,
  `idTipoPregunta` int(11) NOT NULL,
  `consigna` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rtaalumno`
--

CREATE TABLE `rtaalumno` (
  `idRtaAlumno` int(11) NOT NULL,
  `nroPregunta` int(11) DEFAULT NULL,
  `nroRespuesta` int(11) DEFAULT NULL,
  `idExamen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rtapregunta`
--

CREATE TABLE `rtapregunta` (
  `idRespuesta` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `respuesta` varchar(45) DEFAULT NULL,
  `correcta` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `idSede` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idPais` int(11) NOT NULL,
  `idAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedecarrera`
--

CREATE TABLE `sedecarrera` (
  `idSede` int(11) NOT NULL,
  `idCarrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `idTipo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiponota`
--

CREATE TABLE `tiponota` (
  `idTipoNota` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipopregunta`
--

CREATE TABLE `tipopregunta` (
  `idTipoPregunta` int(11) NOT NULL,
  `nombreTipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `idPerfil` int(11) NOT NULL,
  `clave` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `estado` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idPerfil`, `clave`, `mail`, `estado`) VALUES
(1, 1, 'pass', 'g6@', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD KEY `fk_Admin_Tipo1_idx` (`idTipo`),
  ADD KEY `fk_Admin_Persona1_idx` (`idAdmin`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idAlumno`),
  ADD KEY `fk_Alumno_Persona1_idx` (`idAlumno`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`idCarrera`);

--
-- Indices de la tabla `carreraalumno`
--
ALTER TABLE `carreraalumno`
  ADD PRIMARY KEY (`idCarrera`,`idAlumno`),
  ADD KEY `fk_Carrera_has_Alumno_Alumno1_idx` (`idAlumno`),
  ADD KEY `fk_Carrera_has_Alumno_Carrera1_idx` (`idCarrera`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`idExamen`,`idInstanciaExamen`,`idAlumno`),
  ADD KEY `fk_Examen_InstanciaExamen1_idx` (`idInstanciaExamen`),
  ADD KEY `fk_Examen_Alumno1_idx` (`idAlumno`);

--
-- Indices de la tabla `examenpregunta`
--
ALTER TABLE `examenpregunta`
  ADD PRIMARY KEY (`idModeloExamen`,`idPregunta`),
  ADD KEY `fk_ModeloExamen_has_Preguntas_Preguntas1_idx` (`idPregunta`),
  ADD KEY `fk_ModeloExamen_has_Preguntas_ModeloExamen1_idx` (`idModeloExamen`);

--
-- Indices de la tabla `historiconotas`
--
ALTER TABLE `historiconotas`
  ADD PRIMARY KEY (`idAlumno`,`idNotas`),
  ADD KEY `fk_Alumno_has_Notas_Notas1_idx` (`idNotas`),
  ADD KEY `fk_Alumno_has_Notas_Alumno1_idx` (`idAlumno`);

--
-- Indices de la tabla `instanciaexamen`
--
ALTER TABLE `instanciaexamen`
  ADD PRIMARY KEY (`idInstanciaExamen`,`idModeloExamen`),
  ADD KEY `fk_Examen_ModeloExamen1_idx` (`idModeloExamen`);

--
-- Indices de la tabla `modeloexamen`
--
ALTER TABLE `modeloexamen`
  ADD PRIMARY KEY (`idModeloExamen`,`idCarrera`),
  ADD KEY `fk_ModeloExamen_Carrera1_idx` (`idCarrera`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`idNotas`,`idExamen`,`idCarrera`),
  ADD KEY `fk_Notas_TipoNota1_idx` (`idTipoNota`),
  ADD KEY `fk_Notas_Examen1_idx` (`idExamen`),
  ADD KEY `fk_Notas_Carrera1_idx` (`idCarrera`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`idPais`),
  ADD KEY `fk_Pais_Admin1_idx` (`idAdmin`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `fk_Pregunta_TipoPregunta1_idx` (`idTipoPregunta`);

--
-- Indices de la tabla `rtaalumno`
--
ALTER TABLE `rtaalumno`
  ADD PRIMARY KEY (`idRtaAlumno`,`idExamen`),
  ADD KEY `fk_RtaAlumno_Examen1_idx` (`idExamen`);

--
-- Indices de la tabla `rtapregunta`
--
ALTER TABLE `rtapregunta`
  ADD PRIMARY KEY (`idRespuesta`,`idPregunta`),
  ADD KEY `fk_RtaPregunta_Pregunta1_idx` (`idPregunta`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`idSede`),
  ADD KEY `fk_Sede_Pais_idx` (`idPais`),
  ADD KEY `fk_Sede_Admin1_idx` (`idAdmin`);

--
-- Indices de la tabla `sedecarrera`
--
ALTER TABLE `sedecarrera`
  ADD PRIMARY KEY (`idSede`,`idCarrera`),
  ADD KEY `fk_Sede_has_Carrera_Carrera1_idx` (`idCarrera`),
  ADD KEY `fk_Sede_has_Carrera_Sede1_idx` (`idSede`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `tiponota`
--
ALTER TABLE `tiponota`
  ADD PRIMARY KEY (`idTipoNota`);

--
-- Indices de la tabla `tipopregunta`
--
ALTER TABLE `tipopregunta`
  ADD PRIMARY KEY (`idTipoPregunta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_Usuario_Perfil1_idx` (`idPerfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `idCarrera` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instanciaexamen`
--
ALTER TABLE `instanciaexamen`
  MODIFY `idInstanciaExamen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modeloexamen`
--
ALTER TABLE `modeloexamen`
  MODIFY `idModeloExamen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `idPais` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rtaalumno`
--
ALTER TABLE `rtaalumno`
  MODIFY `idRtaAlumno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rtapregunta`
--
ALTER TABLE `rtapregunta`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `idSede` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tiponota`
--
ALTER TABLE `tiponota`
  MODIFY `idTipoNota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipopregunta`
--
ALTER TABLE `tipopregunta`
  MODIFY `idTipoPregunta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_Admin_Persona1` FOREIGN KEY (`idAdmin`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Admin_Tipo1` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_Alumno_Persona1` FOREIGN KEY (`idAlumno`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `carreraalumno`
--
ALTER TABLE `carreraalumno`
  ADD CONSTRAINT `fk_Carrera_has_Alumno_Alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Carrera_has_Alumno_Carrera1` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_Examen_Alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Examen_InstanciaExamen1` FOREIGN KEY (`idInstanciaExamen`) REFERENCES `instanciaexamen` (`idInstanciaExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `examenpregunta`
--
ALTER TABLE `examenpregunta`
  ADD CONSTRAINT `fk_ModeloExamen_has_Preguntas_ModeloExamen1` FOREIGN KEY (`idModeloExamen`) REFERENCES `modeloexamen` (`idModeloExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ModeloExamen_has_Preguntas_Preguntas1` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`idPregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `historiconotas`
--
ALTER TABLE `historiconotas`
  ADD CONSTRAINT `fk_Alumno_has_Notas_Alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Alumno_has_Notas_Notas1` FOREIGN KEY (`idNotas`) REFERENCES `notas` (`idNotas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `instanciaexamen`
--
ALTER TABLE `instanciaexamen`
  ADD CONSTRAINT `fk_Examen_ModeloExamen1` FOREIGN KEY (`idModeloExamen`) REFERENCES `modeloexamen` (`idModeloExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `modeloexamen`
--
ALTER TABLE `modeloexamen`
  ADD CONSTRAINT `fk_ModeloExamen_Carrera1` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `fk_Notas_Carrera1` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Notas_Examen1` FOREIGN KEY (`idExamen`) REFERENCES `examen` (`idExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Notas_TipoNota1` FOREIGN KEY (`idTipoNota`) REFERENCES `tiponota` (`idTipoNota`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pais`
--
ALTER TABLE `pais`
  ADD CONSTRAINT `fk_Pais_Admin1` FOREIGN KEY (`idAdmin`) REFERENCES `admin` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `fk_Pregunta_TipoPregunta1` FOREIGN KEY (`idTipoPregunta`) REFERENCES `tipopregunta` (`idTipoPregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rtaalumno`
--
ALTER TABLE `rtaalumno`
  ADD CONSTRAINT `fk_RtaAlumno_Examen1` FOREIGN KEY (`idExamen`) REFERENCES `examen` (`idExamen`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `fk_Sede_Admin1` FOREIGN KEY (`idAdmin`) REFERENCES `admin` (`idAdmin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Sede_Pais` FOREIGN KEY (`idPais`) REFERENCES `pais` (`idPais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sedecarrera`
--
ALTER TABLE `sedecarrera`
  ADD CONSTRAINT `fk_Sede_has_Carrera_Carrera1` FOREIGN KEY (`idCarrera`) REFERENCES `carrera` (`idCarrera`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Sede_has_Carrera_Sede1` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Perfil1` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`idPerfil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuario_Persona1` FOREIGN KEY (`idUsuario`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

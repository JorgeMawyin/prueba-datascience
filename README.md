# prueba-datascience

Este proyecto implementa un dashboard para la visualización y análisis de datos de ventas utilizando **Django** para el backend y **Angular** para el frontend.

## Requisitos Previos

Asegúrate de tener instalado:

- **Python 3.8+**
- **Node.js 14+** y **npm**
- **MySQL** o un servidor compatible con MySQL
- **Angular CLI**

## Configuración de la Base de Datos
- Asegúrate de tener configurada tu base de datos MySQL.
- Carga el dataset en la tabla utilizando el script proporcionado

## Configuración del Backend (Django)

1. Clona el repositorio e ingresa al directorio del backend:
```
   git clone <URL-DEL-REPOSITORIO>
   cd backend
```
2. Crea un entorno virtual y actívalo:
```
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
```
3. Instala las dependencias del proyecto:
```
   pip install -r requirements.txt
```
5. Configura la base de datos MySQL en el archivo `views.py`:
```
  def get_db_connection():
      return mysql.connector.connect(
        host="localhost",
        user="root",
        password="tu_password",
        database="nombre_database"
     )
```
6. Inicia el servidor de desarrollo:
```
   python manage.py runserver
```
El backend estará disponible en: `http://localhost:8000`.

## Configuración del Frontend (Angular)

1. Ingresa al directorio del frontend:
```
   cd frontend
```
3. Instala las dependencias:
```
   npm install
```
3. Inicia el servidor de desarrollo:
```
   ng serve
```
El frontend estará disponible en: `http://localhost:4200`.

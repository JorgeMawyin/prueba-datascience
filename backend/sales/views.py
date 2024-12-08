import mysql.connector
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Configuración de conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="sales_database"
    )

# Vista para indicadores
@csrf_exempt
def get_indicators(request):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    start_date = request.GET.get('start_date') or None
    end_date = request.GET.get('end_date') or None
    category = request.GET.get('category') or None
    region = request.GET.get('region') or None

    query = """
        SELECT SUM(sales) AS total_sales, SUM(profit) AS total_profit 
        FROM sales 
        WHERE (%s IS NULL OR %s IS NULL OR order_date BETWEEN %s AND %s)
          AND (%s IS NULL OR category = %s)
          AND (%s IS NULL OR region = %s)
    """

    params = (start_date, end_date, start_date, end_date, category, category, region, region)
    
    cursor.execute(query, params)
    data = cursor.fetchall()

    conn.close()
    return JsonResponse(data, safe=False)

# Vista para obtener el top 10 de clientes
@csrf_exempt
def get_top_clients(request):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    start_date = request.GET.get('start_date') or None
    end_date = request.GET.get('end_date') or None
    category = request.GET.get('category') or None
    region = request.GET.get('region') or None
    
    query = """
        SELECT customer_name, city, SUM(sales) AS total_sales, SUM(profit) AS total_profit, order_date
        FROM sales 
        WHERE (%s IS NULL OR %s IS NULL OR order_date BETWEEN %s AND %s)
          AND (%s IS NULL OR category = %s)
          AND (%s IS NULL OR region = %s)
        GROUP BY customer_name, city
        ORDER BY total_sales DESC
        LIMIT 10;
    """
    
    params = (start_date, end_date, start_date, end_date, category, category, region, region)
    
    cursor.execute(query, params)
    data = cursor.fetchall()

    conn.close()
    return JsonResponse(data, safe=False)

#Vista para obtener los datos de la línea de tiempo de ventas
@csrf_exempt
def get_sales_timeline(request):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    start_date = request.GET.get('start_date') or None
    end_date = request.GET.get('end_date') or None
    category = request.GET.get('category') or None
    region = request.GET.get('region') or None
    
    query = """
        SELECT order_date AS date, SUM(sales) AS total_sales
        FROM sales
        WHERE (%s IS NULL OR %s IS NULL OR order_date BETWEEN %s AND %s)
          AND (%s IS NULL OR category = %s)
          AND (%s IS NULL OR region = %s)
        GROUP BY order_date
        ORDER BY order_date;
    """
    
    params = (start_date, end_date, start_date, end_date, category, category, region, region)
    
    cursor.execute(query, params)
    data = cursor.fetchall()

    conn.close()
    return JsonResponse(data, safe=False)

#Vista para obtener las categorías
@csrf_exempt
def get_categories(request):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT category FROM sales;")
    categories = cursor.fetchall()

    conn.close()

    return JsonResponse([category['category'] for category in categories], safe=False)

#Vista para obtener las regiones
@csrf_exempt
def get_regions(request):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT region FROM sales;")
    region = cursor.fetchall()

    conn.close()

    return JsonResponse([region['region'] for region in region], safe=False)
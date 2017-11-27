### Optimización de rutas de transmilenio con técnicas bio-inspiradas

https://infinito84.github.io/transmilenio/

#### Datos de las estaciones tomados de:
http://www.sitp.gov.co/plano_de_estaciones_y_portales_de_transmilenio

#### Datos de las rutas:
http://www.sitp.gov.co/buscador_de_rutas

#### Restricciones:
*  Las rutas deben respetar las conexiones actuales.
*  No se puede viajar a la misma estación.
*  Un bus no puede hacer giros inexperados o devolverse a menos que lo tenga permitido, se debe respetar la dirección que lleva el vehículo.

#### Funciones objetivo:
<!--
https://www.codecogs.com/latex/eqneditor.php
\min f(x_{1}) = \sum_{i=1}^{N} \left (t_{1,i} + t_{2,i}  \right ) + u_{n}
\min f(x_{2}) = \frac{\sum_{i=1}^{R} \sum_{j=1}^{R_{i}} R_{i,j}}{R}
 --->
1.  Minimizar el tiempo de los usuarios dentro del sistema:
<img src="./img/f1.svg">

2.  Minimizar la cantidad de paradas por ruta
<img src="./img/f2.svg">

##### Donde:
-  N es el número de pasajeros del sistema = 2.213.236
-  t1 es el tiempo que tomó el usuario dentro de la estación de origen.
-  t2 es el tiempo que duró el usuario dentro del bus.
-  un son los usuarios que no fueron atendidos.
-  R el número de rutas totales
-  Ri un vector con las paradas de la ruta

##### Server pro
git clone https://github.com/infinito84/transmilenio.git
sudo apt-get update
sudo apt-get install gcc-multilib g++ rapidjson-dev libboost-all-dev

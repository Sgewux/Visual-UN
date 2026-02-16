# Taller Transformaciones básicas en computación visual
Sebastián Andrade Cedano 

Entregado el: 11 Feb 2022

## Objetivo
El taller consiste en aplicar las transformaciones de traslación, rotación y escala, a diversos objetos, realizando animaciones que impliquen estas tres transformaciones básicas.

## Implementaciones
### Animación 2D en Python
Primero se define la figura (un triángulo en este caso), la cual es representada por una mátriz homogenea dónde cada columna de la matriz tiene las coordenadas x, y y el 1 adicional para hacer la mátriz homogenea.

```
figure = np.array([
    [0, 0, 1],
    [1, 0, 1],
    [0.5, 1, 1],
    [0, 0, 1]
]).T   # columns = points
```
Ahora se definen las funciones de rotar, escalar y trasladar, las cuales a partir de unos párametros definen la mátriz a utilizar.
```
def move(tx, ty):
    return np.array([
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ])

def rotate(theta):
    c, s = np.cos(theta), np.sin(theta)
    return np.array([
        [c, -s, 0],
        [s,  c, 0],
        [0,  0, 1]
    ])

def scale(sx, sy):
    return np.array([
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ])

```
Ya con esto se puede realizar la animación, la cual va a guardar diversos frames construir el gif.
```
frames = []
os.makedirs("frames", exist_ok=True)

n_frames = 60

for i in range(n_frames):
    t = i / n_frames

    theta = 2 * np.pi * t          # rotatesa
    s = 1 + 0.5 * np.sin(2*np.pi*t)  # beats (escala)
    tx = 2 * t                      # moves x
    ty = np.sin(2*np.pi*t)          # moves y

    T = move(tx, ty) @ rotate(theta) @ scale(s, s)

    transformation = T @ figure

    plt.figure()
    plt.plot(figure[0], figure[1], '--', label="original")
    plt.plot(transformation[0], transformation[1], label="transformed")
    plt.xlim(-3, 4)
    plt.ylim(-3, 4)
    plt.legend()

    filename = f"frames/frame_{i}.png"
    plt.savefig(filename)
    plt.close()

    frames.append(imageio.imread(filename))
```
El primer frame

<img src="./media/frame_0.png" alt="Sample Image" width="400"/>

El último frame

<img src="./media/frame_59.png" alt="Sample Image" width="400"/>

El gif de la animación completa

![idk](./media/animacion.gif)

### Escena en Unity 3D
Para la implementación en Unity, se creó una escena con un cubo, y a esta se agregó un game object `GameManager` el cual contiene un script que define en métodos separados las transformaciones solcitadas
#### Rotar
```
private void RotateCube()
{
    float rotation = 20.0f * Time.deltaTime;
    cube.Rotate(Vector3.one * rotation);
}
```
#### Escalar
```
private void ScaleCube()
{
    cube.localScale = Vector3.one * (3 + 2*Mathf.Sin(Time.time));
}
```
#### Trasladar
```
private void TranslateCube()
{
    if(timer >= 3f)
    {
        cube.Translate(Vector3.up * Random.Range(-2f, 2f));
        timer = 0;
    }

    timer += Time.deltaTime;
}
```
En el método `void Update()`, el cual se ejecuta cada que cambia un frame, se ejecutan estos tres métodos para producir la animación
```
void Update()
{   
    RotateCube();
    ScaleCube();
    TranslateCube();
}
```
![idk](./media/cubo_unity.gif)

### Sketch en Processing
Para el script en processing
1. Se incia en modo 3D
2. Se utiliza el `pushMatrix()`, para aislar las transformaciones
3. Se aplican las transformaciones
4. Se utiliza el `popMatrix()`

```
void setup() {
  size(600, 600, P3D);  // Activate 3D
}

void draw() {
  background(30);
  lights();

  float t = millis() / 1000.0;  // Time in seconds

  pushMatrix();

  float x = sin(t) * 150;
  translate(width/2 + x, height/2, 0);

  rotateX(t);
  rotateY(t * 0.7);

  float s = 1 + 0.5 * sin(t * 2);
  scale(s);

  box(80);

  popMatrix();
}

```

![idk](./media/cubo_processing.gif)

## Aprendizajes y dificultadoes
* Los motores gráficos tienen funciones que facilitan la aplicación de transformaciones para no utilizar directamente las matrices de transformación.
* Se pueden usar funciones sinusoidales para generar transformaciones oscilantes.

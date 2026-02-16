# Taller Jerarquías y Transformaciones: El Árbol del Movimiento
Sebastián Andrade Cedano 

Entregado el: 11 Feb 2022

## Objetivo
El taller consiste en crear una escena 3D en Unity con tres objetos anidados jerárquicamente, para así poder observar como las transformaciones que se aplican sobre el nodo padre son aplicadas a los hijos.

## Implementaciones
### Unity 3D
Primero se creó la escena siguiendo los siguientes pasos:
1. Se añadieron 3 esferas (a, b, c)  representando el sistema solar, dónde "a" es el sol, "b" la tierra y "c" la luna.
2. Se añadieron 3 objetos UI de tipo Slider, los cuales se utilizan para realizar transformaciones sobre el nodo padre.
3. Se añadió un objeto de tipo Text (TMP)  para poder mostrar los datos de posición, rotación y escala de los 3 objetos.
4. Se creó un objeto vacio al cual se le llamó "GameManager" y se le cargó el script en C# para aplicar las transformaciones al nodo padre usando los sliders.
5. Se enlazaron los objetos `Transform`, `Slider` y `TMP_Text` referenciados en el script con sus respetivos Game Objects dentro de la escena.
6. Se enlazaron las propiedades "On value changed" de los sliders con sus respectivas funciones dentro del script.

El script que permite manejar los sliders consiste de una clase pública `SolarController`, dentro de la cual se listas los siguientes atributos:
```
    public Transform a; // Sun
    public Transform b; // Earth
    public Transform c; // Moon
    public TMP_Text label;
    public Slider RotateSlider;
    public Slider PositionSlider;
    public Slider ScaleSlider;
```
También define un método privado `PrintInfo` el cuyo proposito es actualizar en pantalla la información de la posición, rotación y escala de los objetos.
```
    private void PrintInfo()
    {
        label.text = $@"
    Sol
        Position: ({a.position.x.ToString("F2") }, {a.position.y.ToString("F2") }, {a.position.z.ToString("F2") })
        Rotation: ({a.localEulerAngles.x.ToString("F2") }, {a.localEulerAngles.y.ToString("F2") }, {a.localEulerAngles.z.ToString("F2") })
        Scale: ({a.localScale.x.ToString("F2") },{a.localScale.y.ToString("F2") },{a.localScale.z.ToString("F2") })
    Tierra
        Position: ({b.position.x.ToString("F2") }, {b.position.y.ToString("F2") }, {b.position.z.ToString("F2") })
        Rotation: ({b.localEulerAngles.x.ToString("F2") }, {b.localEulerAngles.y.ToString("F2") }, {b.localEulerAngles.z.ToString("F2") })
        Scale: ({b.localScale.x.ToString("F2") },{b.localScale.y.ToString("F2") },{b.localScale.z.ToString("F2") })
    Luna
        Position: ({c.position.x.ToString("F2") }, {c.position.y.ToString("F2") }, {c.position.z.ToString("F2") })
        Rotation: ({c.localEulerAngles.x.ToString("F2") }, {c.localEulerAngles.y.ToString("F2") }, {c.localEulerAngles.z.ToString("F2") })
        Scale: ({c.localScale.x.ToString("F2") },{c.localScale.y.ToString("F2") },{c.localScale.z.ToString("F2") })
        ";
    }
```
Cada slider activa con su propiedad "On value changed" algún método público dentro de la clase, estos métodos son `Rotate`, `Position` y `Scale`.
```
    public void Rotate()
    {
        float value = RotateSlider.value;

        a.localEulerAngles = (new Vector3(0,value*360,0));
        b.localEulerAngles = (new Vector3(0,2*value*360,0));

        PrintInfo();
    
    }
```
El método `rotate` también produce una rotación en el atributo `b` de la clase (el cual representa al Game Object de la tierra), esto para hacer que la luna orbite al rededor de la tierra a medidad que la tierra orbita al rededor del sol.

```
    public void Position()
    {
        float value = PositionSlider.value;
        a.position = new Vector3(0,value,0);

        PrintInfo();
    }
```


```
    public void Scale()
    {
        float value = ScaleSlider.value;
        a.localScale = (new Vector3(3,3,3))*value;

        PrintInfo();
    }
```

#### Uso del slider rotate
![idk](./media/rotation.gif)

#### Uso del slider position
![idk](./media/position.gif)

#### Uso del slider scale
![idk](./media/scale.gif)

## Aprendizajes y dificultadoes
* Los atributos definidos dentro de la clase de C# del script, van asociados a un Game Object dentro de la escena.
* Se pueden crear materiales con texturas personalizadas.


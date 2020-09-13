const { Engine, Render, Bodies, World, MouseConstraint, Composites, Query } = Matter
Matter.use('matter-wrap')

// where is matter being deployed?
const sectionTag = document.querySelector('.shapes')

// width & height of the page
var w = window.innerWidth
var h = window.innerHeight

// this is our engine, not matter's engine
const engine = Matter.Engine.create()
const renderer = Matter.Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    height: h,
    width: w,
    background: '#fff',
    wireframes: false,
    pixelRatio: window.devicePixelRatio,
  }
})

// have the abilty to create a brand new shape
const create = function (x, y) {
  const random = Math.random()

  if (random > 0.5) {
    return Bodies.rectangle(x, y, 38, 50, {
      frictionAir: 0.05,
      render: {
        sprite: {
          texture: 'img/favicon.png',
          xScale: 1,
          yScale: 1
        }
      },
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: w, y: h }
        }
      }
    })
  } else {
    return Bodies.circle(x, y, 25, {
      frictionAir: 0.05,
      render: {
        sprite: {
          texture: 'img/memoji.png',
          xScale: 0.5,
          yScale: 0.5
        }
      },
      plugin: {
        wrap: {
          min: { x: 0, y: 0 },
          max: { x: w, y: h }
        }
      }
    })
  }

}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), {
  isStatic: true,
  render: {
    fillStyle: '#000'
  }
})

const wall = { isStatic: true, render: { visible: false } }
const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wall)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wall)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wall)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wall)

const mouse = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
})

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return create(x, y)
})

World.add(engine.world, [
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouse,
])

// when we click the page, add a new shape
document.addEventListener('click', function (event) {
  const shape = create(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

Engine.run(engine)
Render.run(renderer)










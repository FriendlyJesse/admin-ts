interface Option {
  readonly len: number;
  readonly count: number;
  readonly baseTime: number;
  readonly addedTime: number;
  readonly dieChance: number;
  readonly spawnChance: number;
  readonly sparkChance: number;
  readonly sparkDist: number;
  readonly sparkSize: number;
  readonly color: string;
  readonly baseLight: number;
  readonly addedLight: number;
  readonly shadowToTimePropMult: number;
  readonly baseLightInputMultiplier: number;
  readonly addedLightInputMultiplier: number;
  ox: number;
  oy: number;
  readonly repaintAlpha: number;
  readonly toneChange: number;
}


export default class Bomb {

  // 配置参数
  options: Option = {
    len: 20,
    count: 50,
    baseTime: 10,
    addedTime: 10,
    dieChance: 0.01,
    spawnChance: 0.5,
    sparkChance: 0.1,
    sparkDist: 10,
    sparkSize: 2,
    color: `hsl(tone, 100%, light%)`,
    baseLight: 50,
    addedLight: 10,
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: 0.01,
    addedLightInputMultiplier: 0.02,
    ox: 0,
    oy: 0,
    repaintAlpha: 0.04,
    toneChange: 0.1
  }
  private baseRadius = (Math.PI * 2) / 6
  
  // 构造参数
  private canvasEl: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  private clientWidth = 0
  private clientHeight = 0
  private dieX = 0
  private dieY = 0
  private tick = 0
  
  // line 参数
  private lines: any[] = []
  line: any = {
    x: 0,
    y: 0,
    addedX: 0,
    addedY: 0,
    radius: 0,
    lightInputMultiplier: 0,
    color: "",
    cumulativeTime: 0,
    time: 0,
    targetTime: 0
  }

  constructor (id: string) {
    this.canvasEl = document.getElementById(id) as HTMLCanvasElement
    this.canvasEl.width = (this.canvasEl.parentNode as any).clientWidth
    this.canvasEl.height = (this.canvasEl.parentNode as any).clientHeight
    this.ctx = this.canvasEl.getContext('2d') as CanvasRenderingContext2D
    
    this.init()
  }

  private init () {
    this.clientWidth = (this.canvasEl.parentNode as any).clientWidth
    this.clientHeight = (this.canvasEl.parentNode as any).clientHeight
    this.options.ox = this.clientWidth / 2
    this.options.oy = this.clientHeight / 2
    this.dieX = this.clientWidth / 2 / this.options.len
    this.dieY = this.clientHeight / 2 / this.options.len
    
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.clientWidth, this.clientHeight)
    
    this.loop()
  }

  private async loop () {
    const ctx = this.ctx

    requestAnimationFrame(this.loop.bind(this))
    
    ++this.tick
    ctx.globalCompositeOperation = "source-over"
    ctx.globalCompositeOperation = "source-over"
    ctx.shadowBlur = 0
    ctx.fillStyle = 'rgba(0, 0, 0, alp)'.replace('alp', this.options.repaintAlpha.toString())
    ctx.fillRect(0, 0, this.clientWidth, this.clientHeight)
    ctx.globalCompositeOperation = 'lighter'
    if (this.lines.length < this.options.count && Math.random() < this.options.spawnChance) {
      this.lines.push(this.line)
    }
    this.lines.map((line: any) => this.step(line))
  }

  private reset (line: any) {
    line.x = 0;
    line.y = 0;
    line.addedX = 0;
    line.addedY = 0;
    line.radius = 0;
    line.lightInputMultiplier =
      this.options.baseLightInputMultiplier +
      this.options.addedLightInputMultiplier * Math.random();
    line.color = this.options.color.replace(
      "tone",
      (this.options.toneChange * this.tick).toString()
    );
    line.cumulativeTime = 0;
    this.beginPhase(line)
  }

  beginPhase(line: any) {
    line.x += line.addedX
    line.y += line.addedY
    line.time = 0
    line.targetTime =
      (this.options.baseTime + this.options.addedTime * Math.random()) | 0;
    line.radius += this.baseRadius * (Math.random() < 0.5 ? 1 : -1);
    line.addedX = Math.cos(line.radius);
    line.addedY = Math.sin(line.radius);
    if (
      Math.random() < this.options.dieChance ||
      line.x > this.dieX ||
      line.x < -this.dieX ||
      this.dieY > this.dieY ||
      line.y < -this.dieY
    )
      this.reset(line)
  }

  step(line: any) {
    ++line.time;
    ++line.cumulativeTime;
    if (line.time >= line.targetTime) this.beginPhase(line);
    const prop = line.time / line.targetTime,
      wave = Math.sin((prop * Math.PI) / 2),
      x = line.addedX * wave,
      y = line.addedY * wave;
    this.ctx.shadowBlur = prop * this.options.shadowToTimePropMult;
    this.ctx.fillStyle = this.ctx.shadowColor = line.color.replace(
      "light",
      (
        this.options.baseLight +
        this.options.addedLight *
        Math.sin(line.cumulativeTime * line.lightInputMultiplier)
      ).toString()
    );
    this.ctx.fillRect(
      this.options.ox + (line.x + x) * this.options.len,
      this.options.oy + (line.y + y) * this.options.len,
      2,
      2
    );
    if (Math.random() < this.options.sparkChance)
      this.ctx.fillRect(
        this.options.ox +
        (line.x + x) * this.options.len +
        Math.random() * this.options.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
        this.options.sparkSize / 2,
        this.options.oy +
        (line.y + y) * this.options.len +
        Math.random() * this.options.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
        this.options.sparkSize / 2,
        this.options.sparkSize,
        this.options.sparkSize
      );
  }

}
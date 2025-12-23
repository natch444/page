const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const leafImg = new Image();
leafImg.src = "assets/maple-leaf.png";

const LEAF_COUNT = 30;
const leaves = [];

class Leaf {
	constructor() {
		this.reset();
		this.y = Math.random() * canvas.height;
	}

	reset() {
		this.x = Math.random() * canvas.width;
		this.y = -50;
		this.size = 20 + Math.random() * 25;
		this.speedY = 0.5 + Math.random() * 1.5;
		this.swing = Math.random() * 0.02 + 0.01;
		this.angle = Math.random() * Math.PI * 2;
		this.rotationSpeed = (Math.random() - 0.5) * 0.02;
		this.offset = Math.random() * 1000;
	}

	update() {
		this.y += this.speedY;
		this.x += Math.sin(this.offset + this.y * this.swing);
		this.angle += this.rotationSpeed;

		if (this.y > canvas.height + 50) {
			this.reset();
		}
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(
			leafImg,
			-this.size / 2,
			-this.size / 2,
			this.size,
			this.size,
		);
		ctx.restore();
	}
}

for (let i = 0; i < LEAF_COUNT; i++) {
	leaves.push(new Leaf());
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	leaves.forEach((leaf) => {
		leaf.update();
		leaf.draw();
	});

	requestAnimationFrame(animate);
}

leafImg.onload = animate;

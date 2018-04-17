class Bar{
	constructor(){
	
		 this.options={
			 	fontSize: 13,
		 }
		
		this.screenCSSWidth = wx.getSystemInfoSync().windowWidth;
		this.screenCSSHeight= wx.getSystemInfoSync().windowHeight;

		this.yaxis = this.screenCSSHeight*0.2
	}
	draw( options ){
		this.options = Object.assign({}, this.options, options);
		this.drawBar()
	}
	drawBar(){
		let options = this.options;
		let series = options.series;
		let ctx = wx.createCanvasContext(options.renderTo);
		this.ctx = ctx;

		let maxTag = series.reduce( (a,b)=>a.value>b.value?a:b )
	    let maxTagValue = maxTag.value
	
		this.pixelValRate = (this.screenCSSHeight*0.5)/maxTagValue;
			
		series.forEach((t, index)=> this.drawTagRect(t, index) )

		this.drawyaxis()
			
		ctx.draw()
	}

	drawTagRect( serie, index )
	{
		let options = this.options;
	
		let ctx = this.ctx;
		let series = options.series;
			
		ctx.setFillStyle('#81d8d0')
		ctx.setFontSize(options.fontSize)
		
		var x= (this. screenCSSWidth /14)*(index+1.25)
		var y = this.yaxis
		
		var w = Math.floor(serie.value * this.pixelValRate);
		ctx.fillRect(x,y-w*0.3,(this. screenCSSWidth /14)*0.5,w*0.3)
		
		var text_position_adjustment = 0
		if (serie.value >9)
			{text_position_adjustment = 1.1}
		 else 
		 	{text_position_adjustment = 1.3}

		ctx.fillText(serie.value,(this. screenCSSWidth /14)*(index+text_position_adjustment)+1.5, (y-w*0.3-5))
		
		ctx.setFillStyle('#b2b2b2')

		ctx.fillText(serie.tag,(this. screenCSSWidth /14)*(index+1.25)+1, y+20) 
		
		 
	}

	drawyaxis()
	{
		let ctx = this.ctx;
		var y = this.yaxis

		ctx.beginPath()
		ctx.setStrokeStyle('#b2b2b2')
		ctx.setLineWidth(0.2)
		ctx.moveTo(this. screenCSSWidth /14*1.25,this.yaxis)
		ctx.lineTo(this. screenCSSWidth /14*12.75,this.yaxis)

		ctx.fillText("月",this. screenCSSWidth /14*12.9,this.yaxis+20)
	
		ctx.stroke()		
	}
}

module.exports = Bar;
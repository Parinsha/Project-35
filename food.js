class Food
{
    constructor()
    {
       this.foodStock = 0;
       this.lastFed;
       this.image = loadImage("images/Milk.png") 
    }

    display()
    {
        var x = 50, y = 100;
        imageMode(CENTER);
        image(this.image, 430, 330, 50, 50);

        if(this.foodStock != 0)
        {
            for(var i = 0; i < this.foodStock; i++)
            {
                if(i % 10 == 0)
                {
                    x = 50;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}
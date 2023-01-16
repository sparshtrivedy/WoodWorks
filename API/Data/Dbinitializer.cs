using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Data
{
    public static class Dbinitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;
            
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Charme Tan Sofa",
                    Description =
                        "Durable yet soft, sturdy yet comfortable, firm yet relaxed — our Timber Sofa truly has it all. Have a seat, this couch is the premier destination to take a load off.",
                    Price = 20000,
                    PictureUrl = "/images/Images/img1.webp",
                    Brand = "Timber",
                    Type = "Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Oval Dining Table",
                    Description = "If Camelot was a design destination, the knights would have sat at an oval dining table. Share a meal with 4-6 of your favorite people (more if you dont mind bumping elbows). This mid-century style walnut dining table is set atop solid wood legs and features a veneered starburst-style design on the top. Glamour and sculptural interest, all in one table",
                    Price = 15000,
                    PictureUrl = "/images/Images/img2.webp",
                    Brand = "Conan",
                    Type = "Dining Table",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut 6 Drawer Double Dresser",
                    Description =
                        "More than a place to put your socks. Finished with veneered American walnut, a subtle chevron wood grain pattern, and a modern metal pull — the Nera 6-drawer double dresser is an elegant addition to any space.",
                    Price = 18000,
                    PictureUrl = "/images/Images/img3.webp",
                    Brand = "Nera",
                    Type = "Dresser",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut Queen Bed with Nightstand",
                    Description =
                        "Behind closed doors. Designed to peek out from behind the comfort of a pillow-adorned mattress, the headboard of the low-profile Nera Bed, designed with a subtle chevron pattern, brings a natural warmth to any bedroom. Nightstand extensions featuring discreet cord management and soft-close drawers add a practical mid-century modern flair. Constructed of solid wood and wood veneer, the Nera Bed with Nightstands features two powder-coated steel legs at the foot of the bed for extra stability.",
                    Price = 30000,
                    PictureUrl = "/images/Images/img4.webp",
                    Brand = "Nera",
                    Type = "Bed",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Black Floor Lamp",
                    Description =
                        "The crescent-shaped metal shade and sharply curved stand draw inspiration from an iconic mid-century design. Leap has an easily adjustable shade to direct light right where you want it, perfect for a home office or reading nook. Its stylish finishes combine matte and polished metal adding new life to the classic design.",
                    Price = 25000,
                    PictureUrl = "/images/Images/img5.webp",
                    Brand = "Leap",
                    Type = "Lamp",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Olive Green Right Sectional",
                    Description =
                        "Where have you been all my life? You will be asking the Abisko sectional this question once you take this baby for a spin. Feather-mix cushions and titanium-finished legs give this sectional an edge, while the minimalist Scandinavian shape and stunning Aurora Blue upholstery will impress even your mother-in-law. Who said that?",
                    Price = 12000,
                    PictureUrl = "/images/Images/img6.webp",
                    Brand = "Abisko",
                    Type = "Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Neptune Blue Queen Bed",
                    Description =
                        "You know the one. Our iconic Sven Bed available in Italian-tanned leather, textured upholstery, and buttery soft velvet. Hard decisions, we know. But your soft landing awaits.",
                    Price = 1000,
                    PictureUrl = "/images/Images/img7.webp",
                    Brand = "Sven",
                    Type = "Bed",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Black Sconce",
                    Description =
                        "You know the one. Our iconic Sven Bed available in Italian-tanned leather, textured upholstery, and buttery soft velvet. Hard decisions, we know. But your soft landing awaits.",
                    Price = 1500,
                    PictureUrl = "/images/Images/img8.webp",
                    Brand = "Leap",
                    Type = "Lamp",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Charme Tan Sofa",
                    Description =
                        "The Sven charme tan sofa is your new BFF. The tufted bench seat supports super long movie marathons, and overstuffed cushions and round bolsters have your back no matter what position you chill in. Over time, the full-aniline leather will develop a beautiful vintage patina. Sturdy and adaptable, this tan leather sofa is the focal point in any room, and will easily adapt to your future decor whims. Natural color variations, wrinkles and creases are part of the unique characteristics of this leather. It will develop a relaxed vintage look with regular use.",
                    Price = 1800,
                    PictureUrl = "/images/Images/img9.webp",
                    Brand = "Sven",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Ivory Boucle Lounge Chair",
                    Description =
                        "A lounge chair that screams “easy street” in every sense. Is it the bouclé fabric? The curvaceous proportions held up by a solid wood frame? How it will seamlessly suit the rest of your decor, regardless of your style? It is all this and more. Take a saunter down easy street, end up on the Gabriola.",
                    Price = 1500,
                    PictureUrl = "/images/Images/img10.webp",
                    Brand = "Gabriola",
                    Type = "Chair",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut Desk",
                    Description =
                        "Work wonders. Whether catching up on emails or writing a pile of thank you notes, the Culla desks solid construction, smooth wood surface, and streamlined design add a touch of style to any task. Two drawers keep your papers and takeout lunch menus organized while the middle shelf is the perfect place to stash your keyboard.",
                    Price = 1600,
                    PictureUrl = "/images/Images/img11.webp",
                    Brand = "Culla",
                    Type = "Desk",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut King Bed",
                    Description =
                        "Behind closed doors. Designed to peek out from behind the comfort of a pillow-adorned mattress, the headboard of the low-profile Nera Bed, designed with a subtle chevron pattern, brings a natural warmth to any bedroom. Constructed of solid wood and wood veneer, the Nera features two powder-coated steel legs at the foot of the bed for extra stability.",
                    Price = 1400,
                    PictureUrl = "/images/Images/img12.webp",
                    Brand = "Nera",
                    Type = "Bed",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Charme Tan Right Sectional Sofa",
                    Description =
                        "A classic for a reason. Upholstered in full-aniline leather, the sectional plays the same notes as our Sven Sofa, but with more space to stretch out. Over time, the leather will develop a beautiful vintage patina. Natural color variations, wrinkles and creases are part of the unique characteristics of full-aniline leather. It will develop a relaxed vintage look with regular use.",
                    Price = 1400,
                    PictureUrl = "/images/Images/img13.webp",
                    Brand = "Sven",
                    Type = "Sofa",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut King Bed",
                    Description =
                        "Simple pleasures. The Lenia bed takes notes from the Shaker school of design: tapered legs and spindles, solid and veneered walnut, concealed joinery, and an unadorned silhouette. The Lenias quiet beauty will take center stage in your bedroom. Sweet dreams.",
                    Price = 25000,
                    PictureUrl = "/images/Images/img14.webp",
                    Brand = "Lenia",
                    Type = "Bed",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut Floor Mirror",
                    Description =
                        "Mirror, mirror in the hall… or, whatever room you choose to style the Beau in. Hung between vertical dowels by black leather straps, this versatile wall mirror will show off in any room it is in.",
                    Price = 18999,
                    PictureUrl = "/images/Images/img15.webp",
                    Brand = "Beau",
                    Type = "Mirror",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Walnut Desk",
                    Description =
                        "Love walnut? Love mid-century design? Of course you do. Crafted from a mix of solid and durable veneer wood, the Krossa is not the kind to crave attention — but it will get some anyway. Use it to organize your papers, get that pressing project done, or plot your next big move.",
                    Price = 19999,
                    PictureUrl = "/images/Images/img16.webp",
                    Brand = "Krossa",
                    Type = "Desk",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Vanilla Ivory Rug",
                    Description = "Like your favorite sweater, made better. Hand-woven wool is tightly looped into a sophisticated, soft rug for your floors. This is a perfect option for wood or stone floors and organic-chic, all-natural spaces.",
                    Price = 15000,
                    PictureUrl = "/images/Images/img17.webp",
                    Brand = "Texa",
                    Type = "Rug",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Natural Wall Mirror",
                    Description =
                        "You have got to see it to be-weave it. You know how you can hear the ocean when you hold a seashell to your ear? The Meron mirror is like that, but for your eyes. Made from natural coco midrib, the round Meron brings coastal cool to your walls. All of a sudden you are wearing head-to-toe linen and can feel the sun on your SPFd face.",
                    Price = 18000,
                    PictureUrl = "/images/Images/img18.webp",
                    Brand = "Meron",
                    Type = "Mirror",
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
import React, { Component } from 'react'

export default class Pricing extends Component {

    constructor(props)
    {
        super(props);
        this.state=
        {
         card:[
             {
                 id:1,
                 title:"WASHING",
                 nof_cloth:"10 Cloths",
                 price:"₹100",
                 items:[
                    { id:1,cloth:"Shirts",price:"₹10"},
                    { id:2,cloth:"Pants",price:"₹10"},
                    { id:3,cloth:"Blouse",price:"₹10"}
                ],
                 btn_text:"CHOOSE PLAN"
             },
             {
                id:2,
                title:" WASH AND IRON",
                nof_cloth:"10 Cloths",
                price:"₹200",
                items:[
                    { id:1,cloth:"Shirts",price:"₹20"},
                    { id:2,cloth:"Pants",price:"₹20"},
                    { id:3,cloth:"Blouse",price:"₹20"}
                ],
                btn_text:"CHOOSE PLAN"
            },
            {
                id:3,
                title:"DRY CLEAN",
                nof_cloth:"2 Cloths",
                price:"₹150",
                items:[
                    { id:1,cloth:"Coats",price:"₹50"},
                    { id:2,cloth:"Blazzers",price:"₹70"},
                    { id:3,cloth:"Cotten cloth ",price:"₹50"}
                ],
                btn_text:"CHOOSE PLAN"
            }
         ]

        }
    }
    render() {
        return (
                <section id="pricing">
                <div className="pricing">
                <div className="price-heading-div">
                <h1 className="price-heading">PRICING</h1>
                <div>
                <h2 className="price-sub-heading">Competitive. Transparent. Affordable.</h2>
                </div>
                </div>

               

                <div className="price-card-deck">
                {
                    this.state.card.map( list => {
                        return(
                            <div className="price-card" key={list.id}>
                            <div className="price-card-top">{list.title} </div>
                            <div className="price-card-body">
                            <h5 className="price-card-title"> <b>{list.nof_cloth}</b> </h5>
                            <h1 className="price-card-price">{list.price}</h1>
                            {
                                list.items.map( list => {return( <p  key={list.id}className="price-card-text">{list.cloth} {list.price}</p>)})                    
                            }
                            <button className="price-btn">{list.btn_text}</button>
                            </div>
                            </div>                 
                        )
                    })
                }
                </div> 

                </div>
                </section>
            
        )
    }
}

import {useState} from "react" ;
import BasicFigure from "./BasicFigure";
import "./FigureList.css";
const initialImages=[
    { src:"https://tse4.mm.bing.net/th/id/OIP.V_-7chqJTTh2iDrgMZEo_AHaEK?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3 ",caption:"Image 1" },
    { src:"https://th.bing.com/th/id/OIP.8IEXr2McfHiDB8ijAT-ZZwHaDt?o=7&cb=defcachec2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3 ",caption:"Image 2" },
    { src:" https://tse1.explicit.bing.net/th/id/OIP.ImPu8A3e_8N97DqVe6qsCgHaJF?cb=defcachec2&w=1200&h=1471&rs=1&pid=ImgDetMain&o=7&rm=3",caption:"Image 3" }
];
const FigureList=()=>{
    const[images,setImages]=useState(initialImages);

    const addImage=()=>{
        const randomId=Math.floor(Math.random()*1000);
        const newImage={
            src:`https://picsum.photos/400/300?random=${randomId}` ,
            caption:`Image ${images.length + 1}`
        };
        setImages([...images, newImage]);
    };
    const removeImage=(index)=>{
        setImages(images.filter((_, i) => i !==index));
    };
    return (
        <div className="container">
            <h1>Dynamic Image Gallery</h1>
            <div className="buttons">
                <button onClick={addImage}> Add Image</button>
            </div>
            <div className="gallery">
                { images.map((image,index) =>(
                    <BasicFigure key={index} src={image.src}
                    caption={image.caption} onRemove={() => removeImage(index)} />
                ))}
            </div>
        </div>
    );
};
export default FigureList;
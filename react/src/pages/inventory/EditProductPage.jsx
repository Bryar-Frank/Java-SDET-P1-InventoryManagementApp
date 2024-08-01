import EditProductForm from "../../components/forms/EditProductForm"

export function EditProductPage (props) {
    console.log(props.location)
    return <>
        <EditProductForm props/>
    </>
}
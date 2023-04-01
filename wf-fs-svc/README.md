# WF-FS-SVC

WireFrame FileSystem Service is responsible for
1. accpeting files.
2. validating files.
3. store the file entry in the database.
4. providing the file processing status.


# TODO
difference between es6 and higher es
what should be used?
<!--  -->


S1 :> upload the image and publish the message. 
   :> read the message and add the data into entry.




## API DESIGN
1. /upload 
GET x-file-name: ""


RESP:
{
   id: "image-tracking-id"
   name: "display-image-name",
   status: "IMG_UPLOADED"
}

2. /status/image-id
{
   id: "id"
   status: "IMG_PROCESSING"
   predicted: {}
}
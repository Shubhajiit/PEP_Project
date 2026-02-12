const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) return res.status(401).json({ message: "Missing token" });
    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "JWT_SECRET is not configured" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("_id email isVerified");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


//Rate Limiting restricting how many request of user how many request 

//Rate limiter stored in memory , 

//Ip address->request ->time

//counter increase
//If counter is >max= request block
//After time window ends counter reset

// Rate limiting protect api from brute force attack , spam , client come theme , which is an define time video  , 

// where should rate limiting need apply

// its should be apply globally for protection , and most strictly to sensitive end points


//What is helmet

//helmet is the express , middleware ,  that secure their app  using http reponse header
//security rules send from server and emforced by browser

//helmet protection
// helmet  automatically send header  , obsens 

// x/ content type  //strict transprt security
//force http , content security policy


// What is helmet
//What is Webhook - automatic http post request send to one system to another when an event happen

// without hook
// pushed based communication
// -- Payment gatway ->send webhhook ->seveer updates order

// webhook flow diagram

// System http post , system  B
//cron jobs'



1. js originaly for browser onnly.
2. node js allow to run outside the browser.
3. Node js is fast bcoz it is non- blocking. 
Sync-> Blocking     ||      Async-> non-blocking
sync-> code run line to line if one task take time then whole task will wa8 for that task to complete
Async-> it will not wa8 for task to complete it run next line

One line Summary-> 
Node js allow js to build backend server
in node we alwz return the value if we dont return it will return undefined as shown below->
> let a=10;
undefined
> a*5
50
>


Note-> REPL (Read, Evaluate, Print and Loop) -> it print the result of last Evaluated Expression, Variable declration dont produce a result so REPL print undefined

# Module (a reauable piece of code)-> A module is just a JavaScript file , one module equals to one file.
it helps us organize code , reuse logic and avoid confusion 

# Common js 
Module.exports => it means what you send
require()-> What you recieve

# ES 
import and export HELLO THIS IS A FILE SUSTEM

********** Events ***********************
# Event artech is a design patter where the flow of the application is determine by event such as-> UserAction 

#EventEmitter -> Custome Event
1. .on(event,listener)  => it register the event
and .emit(event,data)=> it trigger the event
Event Name is string based name

2. .once(event, listener) =>  and .emit(event,data)--> it only emit or print one time

3. .off(event, listener) => it doesnot return anything


#  HTTP ->
http - it is a communication protocol used by client(browser)and server to talk
http Statelessness - means server downot remember about previous request from client to server


Prev request  ----
userData          |--->    becase of this we use Session , cookies and JWT Token
Login State   ----


## Http Request Structure =
1. Method
2. URL
3. Header
4. Body (optional)


# HTTP Module -> It is a build-in and we use it to create a server
########  Difference betwenn Put and Patch..........
# Http Method ->
1. GET - fetch data
2. POST- Post data
3. PUT - Update full data
4. PATCH - paritial Update
5. DELETE - Detete data

# HEADER -> extra information 
content-type, Application/JSON
content-type, Authorizartion /Auntication
used for data format and catching

# BODY --> it contain actuall data , only send with PUT, POST and PATCH

## Server Response  --> it send body , status code , Header
 NOTE-> NODE JS IS EVENTE Driven ARTECTURE

## Creating Response Obj --> backend never send data in JSON (JavaScript Object Notation) formate
frotend Understand JSON easily

## Setting Response Header
1. res.WriteHead(200, {"content-type : "application/JOSN"})
2. res.statuscode //hw

PORT = communication End Point

## Routing - url based request Handling
- Different URL = Different response 
- Implemeting Using -> req.url

## HTTP Methods -
- Define Action on server
- **GET** -> Used to read the Data or fetch the data
**POST**  -> USed to send the data or create the data
**PUT** -> update the data completey
**DELETE** -> Delete the Data


#**PROXY SERVER SIDE RENDERING**
- we are creating a nodeJS server that acts as a **proxy server** (Fake Server)-> bachola between client and server
- the browser will not call the API
- Our Server will call the api , convert Data to HTML and Send HTML to rthe browser

  _________
 | Browser | -> NODE server (Proxy) -> dummyJSON API
 |_________|

# client side rendering is the browser download the minimum html file and thenjs runs in the browser to fetch the data and build the ui

**how csr works** - browser request a page from server 
server sent empty / minimal html + js bundle 
browser downloads the js 
js runs
ui render dynamicaally

**server side rendering** generates the full html (with data ) and then it to the browser 
how ssr works- 
browser request a page 
server fetch the data
server generate full html browser resive to view page


# what is Hydration -
- proces where JS attach EventListener to server render HTML

******************************************** **CHALk** ********************************************************-> 
- Chalk is a Node.js library used to style and color text in the terminal (console output) 🎨🖥️
- Highlight errors, warnings, success messages
- Improve debugging readability



/////////////////////////////////////////////////////  Backend ///////////////////////////////////////////////////////////////////

# MVC -> Model View Controler (Bankend artechture/ express) 
  Request
    |
 Controler
    |
 Services
    |
   DAL
    |
 DataBase

# Model -> Model represent the Data Structure and Rule 
- Const UserData= new mongoose.Schema(
  {
    name: {type:String},
    age: { type: Number, required: true, min: 18, max: 100 },
  }
);

export const User = mongoose.model("User", UserData)

- IN real app Mongooes Schema and prism Schema

# View -> It Handle Ui Handling -> whatever user see on UI 

# Controller -> 
 **Role Of controller**
- *Handle Request and Response*
- *Call Services*
- *Send Status Code*
example --> export const getUser= async((req,res)=>{
                  const User= await userservices.getAllUser();
                  res.status(200.JSON(User))
})
- *service Layer* ->  it contain Bussiness logic , Validation Rule , Calculation and WOrk Flow Knowledge
- *Data Access Layer* -> It read or handles DataBase Opertions oNly like (Query, DB connection logic, )
  ex-> export const FetchUser = ()=>{
          return User;
  }
*DL Talks to database nothing else;*

# Data Transfer Object (DTO) - it control what data is send / Recieve
- Height sensitive field
- Saves Responses
- ex-> export const UserDTO =(user)=>{
    id:user.id.
    name:user.name
}
- DTO is a Data Filter

# Utils - it create a reausable Helper function 
- Data formatter
- tocken Generator
- Hashing
- Ex -> Export const GenerateID= ()=>{
      data.now()
} 

# Constants-> fixed value used across app*
- Roles
- Status Message
- Error code

# Config - Environment and app Setting
- port , DB_URL , API_keys
ex-> export const config={
  port: process.env.PORT || 8080
}

/////////////////////////////////////////////////// **MongoDB** //////////////////////////////////////////////////

# Introduction to MongoDB and database
A database is a organized collection of data that can stored retrieve managed and update efficiently
EX: Banking System-> Customer record , E-commerce-> products data, Social Media-> Post Like Comment
Without database data stored in file hard to search
No relationship between data and no security

# DBMS is a software used to create manage provide querying parameter and handle security
Popular database
# Relational -> MYSQL, PostgreSQL, Oracle
# Non-Relational-> MongoDB , Redis

Core Responsibilities-> Data Storage, Access Control, Backup and recovering , Transaction Management

# Relational Database-> Table based structure , fixed schema, uses SQL, strong acid compliance

# NOSQL-> Flexible schema, JSON like storage , Horizontally scalable, designed for large scale

feature-> schema          |   scaling    | Datatype     |  Query
SQL    -> fixed schema	  |   vertical   | Structure	  |  SQL
NOSQL  -> flexible schema |   Horizontal | Unstructured |  DB specific

#                                    MongoDB   vs 	relational database
collection	  | 	Table
Document	    |	  Row
Field		      |	Column
Embedded document possible	|	Joins are required
schema is flexible |	schema is fixed 



# core MongoDB concept->
1. database-> container for collection(ex: School DB)
2. collection-> A group of related document(ex: student, course)
3. document-> A single recorded stored as BSON(ex: name , key)

# ACID properties->
1. Atomicity-> all operation succeed or none
2. Consistency-> database remain valid after transaction
3. Isolation-> Transaction don't interfere
4. Durability-> Committed data is permanent


# Dollar Sign ($) In MongoDB shell commands->
- It tells MongoDB: **don’t treat this as a value — treat it as an instruction**

# How MongoDB generates ObjectId automaticaly
- *MongoDB uses a 12-byte ObjectId:*
- **Bytes	Purpose->**
           --->     4	Timestamp
           --->     5	Machine + process
           --->     3	Counter

# Commands->
1. db.student.find({}).sort({age:-1}).limit(3) -> Reverse order (Decending order)-> limit means no of data


# Rate Limiting -> 
- restricting how many request per user  can send in a fixed time
- it stores in memory 
- *Ip address*-> req count -> then time limit

**Flow**
1. Request Arrives 
2. counter Increase
3. if (counter > max) then request BLOCK
4. after time windows ends Counter reset

1. *Why we use Rate Limiting* -> it protect API from Brute force Attacks , Spam , by restrictihg the no. of request a client can make  with in a define time limit , typically returning Http , when limit reached

2. *Where should Rate Limiting applied* -> it should be apply globaly for API protection and more strictly on senstive end point like Authentication and otp services   

# What is HELMET -> // 🔐 Security headers-> collection of small middlewares each setting a Header 
helmet () ->
1. frameguard();
2. hsts();
3. noSnif();
4. xssFilter();
5. hidePoweredBy();

USe Https With hsts() 
helemt - hsts header -> Forces Browser -> Alwz use htpps
*Inportant in production Deployment

app.use(helmet());  //
--> it is an express middleware  that secure thier APP by seeting http response header
--> **it doesnt block request like Rate Limiting insead it tells to brower behaves securily**

# NOTE--> securty rules send from server -> enforce by browser

//// Helmet Protection /////////  -> Helment automaclty send haders like
1. x-frame-options -> blocks iframe embeading 
2. x-content-type-options -> stop MIME
2. Strict-transport-security -> forces http
4. content-security-policy -> block melicious scripts
5. Remove x-power-by ->   




# INTERVIEW QUESTION ->
What is helemt -> it is a express middleware that enhance the application security by seeting various http headers to protect against common web vernerbilty
1. click jacking 
2. MIME slifing
3. xss

QUes-02 Does Helemt replace validation or Rate Limiting
-> NO , helemt secure browset bheavioyr while validation and rate limitng source and secure application logic and traffic control

# MOST powerFULL Helemt Feature
-> content security policy becoz it can prevet exection of unauthorized script
-> and signifcanty reduce Xss  risk


//////////////////////////////////////////////////////////// WEB HOOK ////////////////////////////////////////
# A webHook is automatic http post request send from one system to another when an event happens
# A webhook is an Event Driven http callback whrere one syatem automaticaly send a POST request to another System when an specific Event Occurs


# *Noraml Way* (Without webHook) ->
- client -> "Any update"
- server -> "No"
- client -> "Any update"
- server -> "No"
the waste of CPU nettwork in time

# *With WebHook Way* ->
- Event Happens -> "Server imideatly send POST" -> Other System recieve Update -> *This is callesd pushed bases communication*

# WHY DO WE USE WEBHOOK (real word example)->
1. Withou WebHook -> 1.PAyment Status Must be checked repeadtly 
                      2. Github commits must be pulled
                      3 Notifaction become slow
2. With WebHook  ->     1. Instant Updates
                      2. less server load 
                      3. real time  automation 


PAYMENT(Stripe Razorpay)
- **payment success**-> payment Gateway -> sends Web hook -> server Update order

*WEBHOOK flow Diagram* -->
User Action 
    |
Event Occurs in a System 
    |
Sytem A sends http POST (Webhook)
    |
System B endpoint recieve data
    |
System B perfrom Action
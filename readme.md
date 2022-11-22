
# To-do API


## How to run app

Pull this project and run this below:

```bash
  cd PongNP-BeDee-ToDoAPI
  npm install
  node app.js
```
    
## API Reference
### Get the datas
endpoint :
```https
GET /?type={all,marked,unmarked}
```
query
| Name  | Value | Default
| - | - | - |
| type  | string  | "unmarked" |

### Create a data
endpoint :
```https
POST /
```
Body JSON :
```https
{
    "text": "hfghfghf",
    "is_marked": false
}
```
Body Variable
| Name  | Value | Required?
| - | - | - |
| text  | string  | ✅ |
| is_marked  | boolean  | ❌ |

### Update a data
endpoint :
```https
PUT /:id
```
Body JSON :
```https
{
    "text": "hfghfghf",
    "is_marked": false
}
```
Param
| Name  | Value | Required?
| - | - | - |
| id  | number  | ✅ |

Body Variable
| Name  | Value | Required?
| - | - | - |
| text  | string  | ❌ |
| is_marked  | boolean  | ❌ |

### Delete a data
endpoint :
```https
DELETE /:id
```
Param
| Name  | Value | Required?
| - | - | - |
| id  | number  | ✅ |
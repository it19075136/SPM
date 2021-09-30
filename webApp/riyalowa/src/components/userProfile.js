import React, { Component } from 'react'
import { Button, Checkbox, Divider, Form, Header, Icon, Modal, Segment } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { userUpdate,deleteProfile } from '../redux/actions/userActions';
class userProfile extends Component  {

    state={
        user:{
            email: "",
            password: "",
            phoneNumber: "",
            image:[],
            name:""
          },
          action:false,
          repassword:"",
          newPassword:"",
          currentPassword:"",
          imageList:[],
          imgModalOpen:false,
          iconState:{
            name:false,
            email:false,
            phoneNumber:false
          },

    }
    
    
    componentDidMount(){
        const item = localStorage.getItem("user");
        const decodeItem = jwt.decode(item);
        this.setState({
            ...this.state,
            user:{
                email:decodeItem.email?decodeItem.email:"",
                password:decodeItem.password?decodeItem.password:"",
                phoneNumber:decodeItem.phoneNumber?decodeItem.phoneNumber:"",
                image:decodeItem.image ? decodeItem.image : [],
                name:decodeItem.name?decodeItem.name:""
            }
        },)
      }
    render() {

    const item = localStorage.getItem("user");
        const decodeItem = jwt.decode(item);
   
    const notify = () => this.state.action ? toast.success('update is successfull!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress: undefined,
    }) :  toast.error('update was unsuccessful', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress: undefined,
    }) 


    const formHandler = (e) => {
       
        this.setState({
            ...this.state,
            user:{
              ...this.state.user,
              [e.target.name]:e.target.value
            }
          })
    }
    const submitHandler = (e) => {
       
        e.preventDefault();
        
        console.log('in promise in addNewPAssword')
        this.setState({
            ...this.state,
            user:{
              ...this.state.user,
              password:this.state.newPassword
            }
          })
        this.props.userUpdate(this.state.user,decodeItem).then((res) => {
            console.log('in post');
            const { token } = res;
            if (token) {
                
                this.setState({
                    ...this.state,
                    action:true
                  })
                  notify();
                            }
            else{
                this.setState({
                    ...this.state,
                    action:false
                  })
                  notify();
            }
            
        }).catch((err) => {
            
            this.setState({
                ...this.state,
                action:false
              })
              notify();
        })

    }
    const passwordHandler = (e) => {
        
        e.preventDefault();
        console.log('this.state',this.state);
        if (this.state.newPassword === this.state.repassword && hashPassword.verify(this.state.currentPassword, this.state.user.password)) {
            console.log('in promise in addNewPAssword')
           
            const password = hashPassword.generate(this.state.newPassword)
            console.log("password",password)
            this.setState({
                ...this.state,
                newPassword:hashPassword.generate(this.state.newPassword)
              })
              console.log('this.state',this.state);
              this.props.userUpdate({"password":password},decodeItem).then((res) => {
                console.log('in post');
                const { token } = res;
                console.log("token",token)
                console.log("res",res)
                if (token) {
                   
                    this.setState({
                        ...this.state,
                        action:true
                      })
                      notify();
                    

                    
                }
                
                else{
                    this.setState({
                        ...this.state,
                        action:false
                      })
                      notify();
                }
               
            }).catch((err) => {
                
                this.setState({
                    ...this.state,
                    action:false
                  })
                  notify();
            })
        }
        else{
            this.setState({
                ...this.state,
                action:false
              })
              notify();
        }
    }
    const deleteProfile =()=>{
        this.props.deleteProfile(decodeItem).then((res) => {
            console.log('in post');
            
            console.log("res.data",res)
            if (res != "Action unscuccesful") {
                
                localStorage.removeItem("user");
                this.setState({
                    ...this.state,
                    action:true
                  })
                  notify();
                  window.location.href = '/'
                
            }
            else{
                this.setState({
                    ...this.state,
                    action:false
                  })
                  notify();
            }
           
        }).catch((err) => {
            
            this.setState({
                ...this.state,
                action:false
              })
              notify();
        })
    }
    return (
        <div className="profile-main">
            <div>
                <Header as='h2' icon textAlign='center' style={{marginRight: '-300px', color: '#076AE0'}}>
                    <Icon name='user' circular />
                    <Header.Content>User Profile</Header.Content>
                </Header>
                <Header as='h5' icon textAlign='right' style={{marginRight: '-400px', color: '#076AE0', }}>
                
                    
                </Header>
                <Form className='user-profile-form-centered'>
              
                    {this.state.user.image.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" className="img-content" />
                        </div>
                    ))}
                    <Modal
                        closeIcon
                        open={this.state.imgModalOpen}
                        trigger={<Button color='blue' type='button'><Icon name='camera' />Profile Image</Button>}
                        onClose={() => this.setState({...this.state,imgModalOpen:false})}
                        onOpen={() => this.setState({...this.state,imgModalOpen:true})}
                    >
                        <Header icon='image' content='Update Images' />
                        <Modal.Content>

                            <ImageUploading
                                multiple
                                value={this.state.user.image}
                                onChange={(imageList, addUpdateIndex) =>this.setState({...this.state,user:{image:imageList}})}
                                maxNumber={2}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div className="upload__image-wrapper">
                                        <div className='uploader-area'>
                                            <Segment
                                                className='dnd-image-area'
                                                style={isDragging ? { backgroundColor: '#076AE0', color: 'white' } : { backgroundColor: '#ddd' }}
                                                textAlign='center'
                                                onClick={onImageUpload}
                                                {...dragProps}>
                                                Click or Drop Images here
                                            </Segment>
                                            &nbsp;
                                            <Button color='red' type='button' disabled={this.state.user.image.length < 1} onClick={onImageRemoveAll} ><Icon name='trash' />Remove  image</Button>
                                        </div>
                                        <div className="image-list">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <Button color='grey' size='mini' type='button' icon='pencil' onClick={() => onImageUpdate(index)} />
                                                        <Button color='red' size='mini' type='button' icon='trash' onClick={() => onImageRemove(index)} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' 
                            onClick={() => this.setState({...this.state,imgModalOpen:false})}
                            >
                                <Icon name='checkmark' /> Done
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <br />
                    <Form.Field>
                        <div>
                            <Icon name="user" />
                            <label>Name</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                            
                                name={this.state.iconState.name ? 'save' : 'edit'}
                                onClick={() => this.setState({...this.state,iconState:{...this.state.iconState,name:!this.state.iconState.name}})}
                            />
                            <input placeholder='Name' name="name" onChange={formHandler} 
                            value={this.state.user.name}
                                disabled={this.state.iconState.name ? false : true}
                            />
                        </div>
                        <div>
                            <Icon name="mail" />
                            <label>Email</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                                name={this.state.iconState.email ? 'save' : 'edit'}
                                onClick={() => this.setState({...this.state,iconState:{...this.state.iconState,email:!this.state.iconState.email}})}

                            />
                            <input placeholder='Email' name="email" onChange={formHandler} 
                            value={this.state.user.email}
                                disabled={this.state.iconState.email ? false : true}
                            />
                        </div>

                    </Form.Field>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>phoneNumber</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                                name={this.state.iconState.phoneNumber ? 'save' : 'edit'}
                                onClick={() => this.setState({...this.state,iconState:{...this.state.iconState,phoneNumber:!this.state.iconState.phoneNumber}})}

                            />
                            <input placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} 
                            value={this.state.user.phoneNumber}
                                disabled={this.state.iconState.phoneNumber ? false : true}
                            />
                        </div>


                    </Form.Field>
                    <Form.Field
                        primary
                        id='submit'
                        name="formSubmit"
                        type='submit'
                        className='form-update-btn'
                        control={Button}
                        onClick={submitHandler}
                        content='Update Profile'
                    /><br /><br />
                    <Button color='red' type='button' onClick={deleteProfile}>Delete Profile<Icon name='trash' circular /></Button>
                </Form>
                
            </div>
            <div className="updateProfile">
                <Form className='user-profile-password-form-centered'>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>Current Password</label>
                        </div>
                        <input placeholder='Current Password' name="password" type="password" 
                        onChange={(e) => {this.setState({...this.state,currentPassword:e.target.value}) }} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>New Password</label>
                        </div>
                        <input placeholder='New Password' name="password" type="password" 
                        onChange={(e) => { this.setState({...this.state,newPassword:e.target.value})}}
                         />
                    </Form.Field>

                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>confirm Password</label>
                        </div>
                        <input placeholder='confirm Password' name="password" type="password" 
                        onChange={(e) => {this.setState({...this.state,repassword:e.target.value})}} 
                        />
                    </Form.Field>
                    <Form.Field
                        primary
                        id='submit'
                        name="formSubmit"
                        type='submit'
                        className='form-update-btn'
                        control={Button}
                        onClick={passwordHandler}
                        content='Change Password'
                    /><br /><br />
                </Form>
            </div>
            <ToastContainer/>
        </div>
    )
}
}
const mapStateToProps = state => ({
    user: state.user.user
  });
  
export default connect(mapStateToProps, { userUpdate,deleteProfile })(userProfile)
  

import React from 'react'
import { useState,useRef,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {


    const [form, setform] = useState({site:"",username:"",password:"",id:""})
    const [passwords, setpasswords] = useState([])
    const [show, setshow] = useState(true)
    const [show2, setshow2] = useState(true)

    useEffect(() => {
        let passwords = localStorage.getItem("passwordsArray")
        if(passwords){
            setpasswords(JSON.parse(passwords))
        }else{
            console.log("sdf")
        }
    },[] )

    const handleChange = (e) => {
        setform({...form,[e.target.name]:e.target.value})
    }

    const savePassword = (params) => {
        if(form.site.length <= 3 && form.username.length <= 3 && form.password.length <= 3){
            console.log("short")
        }else{
        setpasswords([...passwords,{...form,id:uuidv4()}])
        localStorage.setItem("passwordsArray",JSON.stringify([...passwords,{...form,id:uuidv4()}]))
        }
    }
    
    const editPass = (id) => {
        setform(passwords.filter(i=>i.id === id)[0]);
    }
    
    const deletePass = (id) => {
      setpasswords(passwords.filter(i=>i.id != id))
      localStorage.setItem("passwordsArray",JSON.stringify(passwords.filter(i=>i.id != id)))
    }

    const copyText = (text) => {
      navigator.clipboard.writeText(text)
    }
    
    


    return (
        <div className='w-full py-4 text-black'>
            <div className='flex justify-center items-center m-4'>
                <div className='font-mono mr-3 text-lg'>URL:</div>
                <input name='site' className='rounded-lg w-1/2' onChange={handleChange} value={form.site}></input>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-4 '>
                <div className='font-mono text-lg'>Username:</div>
                <input name='username' className=' rounded-lg' onChange={handleChange} value={form.username}></input>
                <div className='font-mono text-lg'>Password:
                </div>
                <div className='relative'>
                    <input type={show ? 'password' : 'text'} name='password' className=' rounded-lg' onChange={handleChange} value={form.password}></input>
                    <img className='absolute w-5 right-1 top-1 cursor-pointer'  src={show?"/hidden.png":"/eye.png"}  onClick={()=>{setshow(!show)}}></img>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <button className='font-bold text-red-500 bg-gray-950 rounded-lg p-2 mt-8 text-xl' onClick={savePassword}>Save Password</button>
            </div>
            <div className='flex flex-col justify-center items-center py-4'>
                <span className='font-bold text-xl text-black py-4'>Your Passwords</span>
                <table className="table-fixed border-seperate border- border-slate-500 w-5/6">
                    <thead>
                        <tr>
                            <th className='border border-slate-700'>Site</th>
                            <th className='border border-slate-700'>Username</th>
                            <th className='border border-slate-700'>Password</th>
                            <th className='border border-slate-700'>Edits</th>
                        </tr>
                    </thead>
                    <tbody>
                    {passwords.length === 0 ? <tr><td>No passwords to show</td></tr>:
                    passwords.map((item)=>{
                        return   <tr key={item.id}>
                        <td className='border border-slate-700 text-[1.15rem] '>{item.site}<img className='w-6 inline-block cursor-pointer' src='/copy.png' onClick={()=>{copyText(item.site)}}></img></td>
                        <td className='border border-slate-700 text-[1.15rem] '>{item.username}<img className='w-6 inline-block cursor-pointer' src='/copy.png' onClick={()=>{copyText(item.username)}}></img></td>
                        <td className='border border-slate-700 text-[1.15rem] '>
                            <span type='password'>{item.password}</span>
                            <img className='w-6 inline-block cursor-pointer' src='/copy.png' onClick={()=>{copyText(item.password)}}></img>
                        </td>
                        <td className='border border-slate-700'>
                            <div className=' flex justify-center items-center gap-4'>
                                <img className='w-6 cursor-pointer' src="/edit.png" alt="edit" onClick={()=>{editPass(item.id)}}></img>
                                <img className='w-6 cursor-pointer' src="/delete.png" alt="delete" onClick={()=>{deletePass(item.id)}}></img>
                            </div>
                        </td>
                    </tr>
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Manager

import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, SafeAreaView, RadioButton,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Loader from './Components/Loader';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi } from './Components/keys'
import Axios from 'axios';

import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';

import ImagePicker from 'react-native-image-picker';


const CustomForm = () => {


    const [loading, setLoading] = useState(false);
    const [FormList, setFormList] = useState([]);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null);


    const _retrieveData = async () => {
        getFormData();
    };


    useEffect(() => {
        (async () => {
            _retrieveData();
        })();
    }, []);


    const getFormData = async () => {
        setLoading(true);
        const APIurl = FormApi_view + 'FormID=1&editID=1';
        await Api_FormData(APIurl)
        console.log("api=", APIurl);
    }

    async function Api_FormData(APIurl) {
        Axios.get(APIurl)
            .then(function (response) {
                //console.log(response.data)
                setLoading(false);
                if (response.data.gender.error === "0") {
                    console.log('Country==', response.data.code[1][4]);

                    setFormList(response.data.code);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     gender: '',
    //     subscribe: false
    // });

    // const handleChange = (name, value) => {
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // }

    // const handleSubmit = () => {
    //     // Do something with the form data
    //     console.log(formData);
    // }

    const [formData, setFormData] = useState({});

    const formElements = [{ type: 1, label: 'Name', placeholder: 'Enter name' }, { type: 2, label: 'Country', options: [{ value: 1, label: 'USA' }, { value: 2, label: 'India' }] },
    { type: 3, label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
    { type: 4, label: 'State', options: [{ value: 1, label: 'California' }, { value: 2, label: 'Texas' }] },
    { type: 5, label: 'Birthdate' },
    { type: 6, label: 'Email', placeholder: 'Enter email' },
    { type: 7, label: 'Interests', options: [{ value: 1, label: 'Sports' }, { value: 2, label: 'Music' }] },
    { type: 8, label: 'Languages', options: [{ value: 1, label: 'English' }, { value: 2, label: 'Spanish' }] },
    { type: 9, label: 'Upload Photo' },
    { type: 10, label: 'Status', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
    { type: 11, label: 'Terms and Conditions' }
    ];


    const handleChange = (value, id) => {
        setFormData({ ...formData, [id]: value });
        console.log(formData);
    }

    const handleUpload1 = async (type) => {
        if (type === 9) {
            const options = {
                title: 'Select Image',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };

            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    handleChange(source, type);
                }
            });
        }
    }

    const handleUpload = () => {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            setImage(source);
          }
        });
      }

    const [fields, setFields] = useState([
        { type: 1, label: 'Name', value: '' },
        { type: 2, label: 'Country', value: '', options: [{ label: 'India', value: 'IN' }, { label: 'Us', value: 'US' }] },
        { type: 3, label: 'Gender', value: '', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
        { type: 4, label: 'City', value: '', options: [{ label: 'Delhi', value: 'DL' }, { label: 'Mumbai', value: 'MUM' }] },
        { type: 5, label: 'Birthdate', value: '' },
        { type: 6, label: 'Interests', value: '', options: [{ label: 'Sports', value: 'sports' }, { label: 'Music', value: 'music' }] },
    ]);



    return (
        <View>
            <SafeAreaView>

                <Loader loading={loading} />


                {/* {fields.map((field, index) => (
                    <View key={index}>
                        <Text>{field.label}</Text>
                        {field.type === 1 && <TextInput value={field.value} onChangeText={text => handleChange(text, index)} />}
                        {field.type === 2 && (
                            <Picker
                                selectedValue={field.value}
                                onValueChange={itemValue => handleChange(itemValue, index)}>
                                {field.options.map((item, i) => (
                                    <Picker.Item key={i} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        )}
                        {field.type === 3 && field.options.map((item, i) => (
                            <View key={i}>
                                <RadioButton
                                    value={item.value}
                                    status={field.value === item.value ? 'checked' : 'unchecked'}
                                    onPress={() => handleChange(item.value, index)}
                                />
                                <Text>{item.label}</Text>
                            </View>
                        ))}
                         {field.type === 4 && (
                            <Picker
                                selectedValue={field.value}
                                onValueChange={itemValue => handleChange(itemValue, index)}>
                                {field.options.map((item, i) => (
                                    <Picker.Item key={i} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        )} 
                    </View>
                ))
                } */}


                {/* {formElements.map((element, index) => {
                    switch (element.type) {
                        case 1:
                            return <TextInput key={index} label={element.label} />;
                        case 2:
                            return <Button key={index} title={element.label} />;
                        case 3:
                            return <Text key={index}>{element.label}</Text>;
                        default:
                            return null;
                    }
                })} */}


                {formElements.map((element, index) => {
                    switch (element.type) {
                        case 1:
                            return <TextInput key={index} label={element.label} placeholder={element.placeholder} onChangeText={(text) => handleChange(text, element.label)} />;
                        case 2:
                            // return <Picker key={index} label={element.label} options={element.options} selectedValue={formData[element.label]} onValueChange={(value) => handleChange(value, element.label)} />;
                            return <Picker
                                selectedValue={formData[element.label]}
                                onValueChange={itemValue => handleChange(itemValue, index)}>
                                {element.options.map((item, i) => (
                                    <Picker.Item key={i} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        case 5:
                            return <DatePicker
                                modal
                                key={index}
                                open={true}
                                date={date}
                                mode={mode}
                                is24hourSource="locale"
                                maximumDate={new Date()}

                                onConfirm={(date) => {
                                    handleChange(date, element.label)
                                }}

                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />;

                        case 6:
                            return <TextInput
                                key={index}
                                label={element.label}
                                placeholder={element.placeholder}
                                keyboardType="email-address"
                                onChangeText={(email) => handleChange(email, element.label)}
                            />;

                        case 7:
                            return <View key={index}>
                                <Text>{element.label}</Text>
                                {element.options.map((option, optionIndex) => {
                                    return <View key={optionIndex}>
                                        <CheckBox
                                            value={option.value}
                                            status={formData[element.label] && formData[element.label].includes(option.value) ? 'unchecked' : 'checked'}
                                            onPress={() => handleChange(option.value, element.label)}
                                        />
                                        <Text>{option.label}</Text>
                                    </View>
                                })}
                            </View>;

                        case 8:
                            return <Picker
                                key={index}
                                label={element.label}
                                options={element.options}
                                selectedValue={formData[element.label]}
                                onValueChange={(value) => handleChange(value, element.label)}

                                mode="dropdown"
                                prompt={element.label}

                                style={{ height: 50, width: 300 }}
                                itemStyle={{ backgroundColor: "grey", color: "white", fontWeight: "bold", textAlign: "center" }}
                            //selectedValue={formData[element.label]}
                            // onValueChange={(value) => handleChange(value, element.label)}
                            />;

                        case 9:
                            return <View key={index}>
                                <Text>{element.label}</Text>
                                {/* <Button title="Upload Image" onPress={() => handleUpload(element.type)} />
                                {formData[element.label] && <Image source={{ uri: formData[element.label].uri }} style={{ width: 100, height: 100 }} />} */}

                                <View>
                                    <Button title="Upload Image" onPress={()=>handleUpload(9)} />
                                    {image && <Image source={image} style={{ width: 100, height: 100 }} />}
                                </View>
                            </View>;

                        // case 4:
                        //     return <Button key={index} label={element.label} options={element.options} selectedValue={formData[element.label]} onValueChange={(value) => handleChange(value, element.label)} />;



                        // case 3:
                        //     return <View key={index}>
                        //         <Text>{element.label}</Text>
                        //         {element.options.map((option, optionIndex) => {
                        //             return <View key={optionIndex}>
                        //                 <RadioButton value={option.value} status={formData[element.label] === option.value ? 'checked' : 'unchecked'} onPress={() => handleChange(option.value, element.label)} />
                        //                 <Text>{option.label}</Text>
                        //             </View>
                        //         })}
                        //     </View>;
                        default:
                            return null;
                    }
                })}

                {/* <Text>Name:</Text>
                <TextInput
                    value={formData.name}
                    onChangeText={text => handleChange('name', text)}
                />
                <Text>Email:</Text>
                <TextInput
                    value={formData.email}
                    onChangeText={text => handleChange('email', text)}
                />
                <Text>Password:</Text>
                <TextInput
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={text => handleChange('password', text)}
                />
                <Text>Gender:</Text>
                <Picker
                    selectedValue={formData.gender}
                    onValueChange={text => handleChange('gender', text)}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                <Text>Subscribe to our newsletter:</Text>
                <Switch
                    value={formData.subscribe}
                    onValueChange={text => handleChange('subscribe', text)}
                />
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                /> */}


            </SafeAreaView>

        </View>
    );
};

export default CustomForm;










import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Switch, Button, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    useTheme,
    TouchableRipple,
    TextInput,
    RadioButton

} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Loader from './Components/Loader';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralFormApi } from './Components/keys'
import Axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from 'react-native-date-picker'

//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import MultiSelect from 'react-native-multiple-select';

import CheckBox from '@react-native-community/checkbox';

//import * as ImagePicker from "react-native-image-picker"
//import { ImagePicker } from 'react-native-image-picker'




const CustomForm = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const [FormList, setFormList] = useState([]);
    const [FormAllDataList, setFormAllDataList] = useState([]);

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
        const APIurl = GeneralFormApi + 'FormID=' + route.params.id;
        await Api_FormData(APIurl)
        console.log("api=", APIurl);
    }

    async function Api_FormData(APIurl) {
        Axios.get(APIurl)
            .then(function (response) {
                //console.log(response.data)
                setLoading(false);
                //if (response.data.gender.error === "0") {
                //console.log('Country==', response.data);
                setFormAllDataList(response.data);
                setFormList(response.data.code);
                //console.log('Country==', response.data.bloodgroup);

                //}
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

    const formDatalist = [

        { type: '11', label: '', value: [], },
    ];

    const [formState, setFormState] = useState(formDatalist);


    const DATA = [
        { id: 1, name: 'Python' },
        { id: 2, name: 'Java' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'C' },
        { id: 5, name: 'PHP' },
        { id: 6, name: 'Swift' },
        { id: 7, name: 'Ruby' },
        { id: 8, name: 'Dart' },
        { id: 9, name: 'SQL' },
        { id: 10, name: 'Perl' },
    ];

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (value, key) => {


        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, value]);
        }
        console.log('data=', selectedCheckboxes);
        //console.log('value=', value);

        // if (updatedFormData[index].value.includes(value)) {
        //     updatedFormData[index].value = updatedFormData[index].value.filter(item => item !== value);
        //   } else {
        //     updatedFormData[index].value.push(value);
        //   }



    };

    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {

        setSelectedItems(selectedItems);

        for (let i = 0; i < selectedItems.length; i++) {
            var tempItem = DATA.find(item => item.id === selectedItems[i]);
            console.log(tempItem);
        }

    };

    const handleChange = (value, id, type) => {

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

    pickImage = () => {
        ImagePicker.openPicker({
            multiple: false,
        }).then(images => {
            console.log(images);
            const source = { uri: images.path };

            setImage(source);
            // do something with the selected images
        });
    };

    const handleUploads = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            takePhotoButtonTitle: 'Take photo with your camera',
            chooseFromLibraryButtonTitle: 'Choose photo from gallery',
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



    const renderButtonsExpert = (data, key) => {
        const buttons = [];
        //console.log('isExpertList=', isExpertList)
        if (data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                buttons.push(
                    <TouchableOpacity style={styles.categoryContainer1} onPress={() => { handleCheckboxChange(data[i]), selectionHandlerExpert(i, key, data) }}>{
                        selectedCheckboxes.includes(data[i]) ?
                            <MaterialCommunityIcons name="checkbox-marked" size={20} color="#FF8C00" /> :
                            <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#aaa" />
                    }<Text style={styles.category}>{data[i].label}</Text>
                        {
                            //console.log("item=", +i)
                            //selectionHandlerExpert(i)
                        }
                    </TouchableOpacity>
                )
            }
        }
        return buttons;
    }


    const selectionHandlerExpert = (ind, key, data) => {
        //console.log('ind: ', ind)

        const newData = data.map((newItem, index) => {

            if (index == ind) {

                return {
                    ...newItem,
                    selected: !newItem.selected,
                    key: ''
                }
            }
            return {
                ...newItem,
                selected: newItem.selected,
                key: key
            }
        })
        //setExpertList(newData)
        setSelectedItems(newData)
        //console.log("selected=", newData);
        //getTotalAmount(newData, product_price)


    }




    return (
        <View style={{ flex: 1, padding: 0 }}>
            <SafeAreaView style={{ flex: 1, padding: 6 }}>

                <Loader loading={loading} />

                <ScrollView style={styles.container}>

                    <View style={styles.sliderContainer}>

                        {FormList.map((field, index) => (
                            <View key={index}>
                                {/* <Text>{field[2]}</Text> */}
                                {field[1] === '1' && <View style={styles.textwrap}>
                                    <TextInput
                                        key={index}
                                        label={field[2]}
                                        mode='flat'
                                        style={styles.textinput}
                                        //placeholder={field[2]}
                                        onChangeText={(text) => handleChange(text, field[0])}
                                    //value={YoutubeLink}
                                    >
                                    </TextInput>
                                </View>}

                                {field[1] === '3' && <View style={styles.textwrap}>
                                    <TextInput
                                        key={index}
                                        label={field[2]}
                                        mode='flat'
                                        style={styles.textinput}
                                        //placeholder={field[2]}
                                        onChangeText={(text) => handleChange(text, field[0])}
                                    //value={YoutubeLink}
                                    >
                                    </TextInput>
                                </View>}

                                {field[1] === '4' && <View style={styles.textwrap}>
                                    <Text style={styles.customheader}>{field[2]}</Text>
                                    {FormAllDataList[field[0]].result_set.map((option) => (
                                        <View key={option.Id} style={styles.radioButton}>
                                            <RadioButton
                                                value={option.Id}
                                                status={formData[field[0]] === option.Id ? 'checked' : 'unchecked'}
                                                onPress={() =>
                                                    setFormData({ ...formData, [field[0]]: option.Id })
                                                }
                                            />
                                            <Text style={styles.radioHerader}>{option.label}</Text>
                                        </View>
                                    ))}
                                </View>
                                }

                                {field[1] === '5' &&
                                    // console.log("data=",FormAllDataList[field[0]].result_set)
                                    <View style={styles.textwrap}>
                                        <Text style={styles.customheader}>{field[2]}</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={FormAllDataList[field[0]].result_set}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="Id"
                                            //placeholder={field[4]}
                                            placeholder={[formData[field[0]]]}
                                            searchPlaceholder="Search..."
                                            //value={[formData[field[0]]]}
                                            onChange={item => {
                                                handleChange(item.Id, field[0]);
                                            }}
                                            renderRightIcon={() => (
                                                <AntDesign style={styles.icon} color="black" name="down" size={20} />
                                            )}
                                        />
                                    </View>
                                }

                                {field[1] === '6' &&
                                    // console.log("data=",FormAllDataList[field[0]].result_set)
                                    <View style={styles.textwrap}>
                                        <Button title={"Select date:"} onPress={() => setOpen(true)} />
                                        <DatePicker
                                            modal={1}
                                            key={index}
                                            open={open}
                                            date={date}
                                            mode={mode}
                                            is24hourSource="locale"
                                            maximumDate={new Date()}

                                            onConfirm={(date) => {
                                                handleChange(date, field[0])
                                                setOpen(false)
                                            }}

                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </View>
                                }
                                {field[1] === '7' && <View style={styles.textwrap}>
                                    <TextInput
                                        key={index}
                                        label={field[2]}
                                        mode='flat'
                                        keyboardType='numeric'
                                        style={styles.textinput}
                                        //placeholder={field[2]}
                                        onChangeText={(text) => handleChange(text, field[0])}
                                    //value={YoutubeLink}
                                    >
                                    </TextInput>
                                </View>}

                                {field[1] === '8' && <View style={styles.textwrap}>
                                    <TextInput
                                        key={index}
                                        label={field[2]}
                                        mode='flat'
                                        textContentType="emailAddress"
                                        keyboardType="email-address"
                                        style={styles.textinput}
                                        //placeholder={field[2]}
                                        onChangeText={(text) => handleChange(text, field[0])}
                                    //value={YoutubeLink}
                                    >
                                    </TextInput>
                                </View>}

                                {field[1] === '9' && <View style={styles.textwrap}>
                                    <Text style={styles.customheader}>{field[2]}</Text>
                                    {/* {FormAllDataList[field[0]].result_set.map((option) => (
                                        <View key={option.Id} style={styles.radioButton}>
                                            <CheckBox
                                                value={false}
                                                onValueChange={() =>
                                                    //setFormData({ ...formData, [field[0]]: option.Id })}
                                                    handleChange(option.Id, field[0])}
                                            //checked={formData.includes(option.Id)}
                                            />
                                            <Text style={styles.radioHerader}>{option.label}</Text>
                                        </View>
                                    ))} */}

                                    {
                                        renderButtonsExpert(FormAllDataList[field[0]].result_set, field[0])
                                    }
                                </View>
                                }


                                {
                                    field[1] === '11' &&
                                    <View style={styles.textwrap}>
                                        <MultiSelect
                                            key={field.label}
                                            items={FormAllDataList[field[0]].result_set}
                                            uniqueKey="Id"
                                            tagRemoveIconColor="#CCC"
                                            tagBorderColor="#CCC"
                                            tagTextColor="#CCC"
                                            selectText={field[2]}
                                            selectedItemTextColor="#CCC"
                                            selectedItemIconColor="#CCC"
                                            itemTextColor="#000"
                                            displayKey="label"
                                            searchInputPlaceholderText="Search Items..."
                                            submitButtonColor="#00BFA5"
                                            submitButtonText="Submit"
                                            style={styles.multiselect}

                                            // onSelectedItemsChange={(selectedItems) =>
                                            //     //console.log("selectedItems:",selectedItems)
                                            //     setFormData({ ...formData, selectedItems })
                                            // }
                                            //  selectedItems={formData.selectedItems}

                                            onSelectedItemsChange={item => {
                                                handleChange(item, field[0]);
                                                console.log('data=', item)
                                            }}
                                            selectedItems={formData[field[0]]}
                                        />    
                                    </View>
                                }

                                {
                                    field[1] === '12' &&
                                    <View style={styles.textwrap}>
                                        <Button title="Select Image" onPress={() => this.pickImage()} />
                                        {image && <Image source={image} style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }} />}
                                    </View>
                                }

                            </View>
                        ))
                        }

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            // onPress={setApi_insertmember}>
                            onPress={() => { }}>
                            <Text style={styles.buttonTextStyle}>Save</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </SafeAreaView>

        </View>
    );
};

export default CustomForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000'
    },
    sliderContainer: {
        width: '95%',
        marginTop: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: { x: -2, y: 2 },
    },
    textinput: {
        //fontFamily: themes.font.medium,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
        height: 55,
        textTransform: "capitalize",
        color: '#545454',
        backgroundColor: '#ffffff'
    },
    textwrap: {
        padding: 5,
        marginBottom: 0,
    },
    textheader: {
        //fontFamily: themes.font.medium,
        marginLeft: 10,
        fontSize: 12,
        color: '#545454',
    },
    customheader: {
        //fontFamily: themes.font.medium,
        marginLeft: 10,
        fontSize: 16,
        color: '#545454',
    },
    dropdown: {
        //margin: 16,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,

    },
    placeholderStyle: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#545454'
    },
    selectedTextStyle: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#545454'
    },
    iconStyle: {
        width: 15,
        height: 15,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    radioButton: {
        flexDirection: 'row',
        marginTop: 5
    },
    radioGroup: {
        margin: 10
    },
    radioHerader: {
        paddingTop: 8,
        marginLeft: 10,
        color: 'black'

    },
    text: {
        padding: 12,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 20,
    },

    buttonTextStyle: {
        color: '#FFFfFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    categoryContainer1: {
        flexDirection: 'row',
        //backgroundColor: '#FF6347',
        borderRadius: 20,
        margin: 7,
        padding: 10,
        paddingHorizontal: 0,
    },
    category: {
        fontSize: 14,
        color: '#000000',
        marginLeft: 5,
    },
});









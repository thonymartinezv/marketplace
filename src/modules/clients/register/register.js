import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions,Platform,ToastAndroid,AlertIOS, KeyboardAvoidingView, Modal} from 'react-native';
import {Item,Input,Button, Spinner} from 'native-base'
import UsuarioSvg from '../../../../assets/icon/general/usuario.svg'
import CandadoSvg from '../../../../assets/icon/general/candado.svg'
import AdminUsers from '../../../model/AdminUsers'
import { ScrollView } from 'react-native-gesture-handler';


export default class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email:"",
            pass:"",
            repeatPass:"",
            register:false,
            modalVisible:false
        }
    }

    cancelled = ()=>{
        this.setState({
            modalVisible:false
        })
    }

    save = ()=>{
        this.register()
        this.setState({
            modalVisible:false
        })
    }

    activeModal = async () =>{
        if(
            this.state.email == "" ||
            this.state.pass == "" ||
            this.state.repeatPass == ""
        ){
            this.notifyMessage("Verifique que ningún campo esté vacío")
            return false
        }
        if(!this.validateEmail()){
            this.notifyMessage("Por favor, ingresar un correo válido")
            return false
        }
        if(await AdminUsers.checkedEmail(this.state.email)){
            this.notifyMessage("El correo que ingreso ya ha sido registrado anteriormente")
            return false
        }
        if(this.state.pass != this.state.repeatPass){
            this.notifyMessage("Verifique que las contraseñas coincidan")
            return false
        }
        this.setState({
            modalVisible:true
        })
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
    }

    validateEmail = ()=>{
        if(this.state.email.length > 11 && this.state.email.includes("@")){
            return true
        }
        return false
    }

    register = async ()=>{
        this.setState({
            register:true
        })
        var result = await AdminUsers.setUserFirebase(this.state.email,this.state.pass)
        if(result){
          this.notifyMessage("Usuario registrado correctamente")
          this.props.navigation.navigate('login')
          this.setState({
            register:false,
            email:"",
            pass:"",
            repeatPass:""
        })
        }else{
            this.notifyMessage("No se pudo completar el registro, por verifique su conexión")
            this.setState({
                register:false
            })
        }
    }

    modal = () =>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)",

                }}>
                        <View style={{
                            width:Dimensions.get('window').width*0.9,
                            marginVertical:Dimensions.get('window').height*0.025,
                            marginHorizontal:Dimensions.get('window').width*0.05,
                            backgroundColor:"white",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation:7,
                            paddingTop:Dimensions.get('window').height*0.05,
                            paddingBottom:Dimensions.get('window').height*0.025,
                            paddingHorizontal:Dimensions.get('window').width*0.05,
                        }}>
                        <ScrollView 
                        height={Dimensions.get('window').height*0.7} marginBottom={Dimensions.get('window').height*0.025}>
                            <View style={{
                                width:Dimensions.get('window').width*0.725,
                                alignItems:'center'
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.055,
                                    color:'#4D4D4D',
                                }}>
                                    Términos y condiciones
                                </Text>
                            </View>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.06,
                            }}>
                                {"\n"}
                                Al acceder y/o utilizar la Plataforma, el Usuario presta conformidad con las 
                                presentes Términos y Condiciones. De no está de acuerdo, con los mismos no 
                                podrá usar la Plataforma, prohibiendo el ingresar y la utilización.
                            </Text>
                            <Text style={{
                                    fontSize:Dimensions.get('window').width*0.04,
                                    color:'#4D4D4D',
                                    marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                    1. USUARIOS:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.06,
                            }}>
                                Podrán ser Usuarios las personas mayores de 18 años, que posean capacidad legal para 
                                contratar y que no tengan ningún impedimento según las leyes Perú para utilizar la 
                                Plataforma. Atento a la imposibilidad de controlar la edad del Usuario se requiere que 
                                al registrarse declare, en carácter de declaración jurada, ser mayor de 18 años. 
                                Cualquier incumplimiento o falsedad al respecto será exclusiva responsabilidad del 
                                Usuario y/o de sus padres y/o tutores.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                2. ACCESO DE LOS USUARIOS – SU REGISTRACION
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.06
                            }}>
                                Podrán ser Usuario de la Plataforma los que cumplan con los siguientes requisitos:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                lineHeight: Dimensions.get('window').width*0.06,
                                fontSize:Dimensions.get('window').width*0.04
                            }}>
                                {"\n"}
                                a) Haber cumplido 18 años de edad.{"\n"}
                                b) Completar los campos obligatorios del formulario de registro, en el que se solicitan 
                                datos de carácter personal, a título enunciativo y no taxativo, el nombre de usuario, 
                                DNI, provincia, dirección, número de teléfono y correo electrónico.{"\n"}
                                c) Aceptar los presentes Términos y Condiciones.{"\n"}
                                d) Aceptar la Política de Privacidad, Protección de Datos y Aceptar la Política de Cookies.
                                {"\n"}
                                El Usuario debe garantizar que todos los datos sobre su identidad que consigna en el 
                                formulario de “Registrar Cliente” de la Plataforma son veraces, exactos y completos, haciéndosele saber que los mismos revisten carácter de declaración jurada. Asimismo, se compromete a mantener actualizados sus datos en el formulario “Actualizar Data”.
                                {"\n"}
                                Para el caso que Amano considere que existen motivos fundados para dudar acerca de la veracidad y/o exactitud de los datos consignados por el Usuario podrá denegarle el acceso y uso a la Plataforma.
                                {"\n"}
                                Al registrarse en la Plataforma el Usuario seleccionará un nombre de usuario (username), email y una clave de acceso (password). Tanto el username como el password son estrictamente confidenciales, personales e intransferibles.
                                {"\n"}
                                El Usuario se obliga a no divulgar los datos relativos a su cuenta ni hacerlos accesibles a terceros. Atento a que Amano no puede garantizar la identidad de los Usuarios, éstos serán los únicos responsables en caso de uso de dichos datos por terceros, incluidas las manifestaciones vertidas en la Plataforma, o cualquier otra actuación que se lleve a cabo mediante el uso del username y/o password. Para el supuesto que el username o password de un Usuario sea divulgado, sustraído o extraviado, el Usuario deberá poner en conocimiento de inmediato dicha circunstancia a Amano mediante correo electrónico (Indicar correo).
                                {"\n"}
                                Al registrarse en la Plataforma ello importará: a) Que el Usuario acepta proporcionar información precisa, actual y completa, tal como lo indiquen los formularios de registro en la Plataforma ("datos de registro"); b) Que el Usuario acepta y se obliga a mantener la seguridad de su contraseña; c) Que el Usuario acepta mantener y actualizar de manera inmediata los datos de registro, y cualquier otra información que proporcione a la Plataforma, de manera precisa, actualizada y completa; d) Que el Usuario acepta todos los riesgos que pueda implicar el acceso no autorizado a los datos de registro y cualquier otra información que proporcione al Sitio; e) Que el Usuario acepta utilizar este sitio para fines personales y no con fines comerciales; f) Que el Usuario no podrá ser titular de más de una cuenta, a la vez que no podrá vender, comerciar o transferir esa cuenta a ninguna otra persona, así como tampoco acceder a Amano por ningún otro medio que no sea a través de la interfaz provista públicamente.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                3. CAMBIOS DE POLÍTICA:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Amano se reserva el derecho de modificar a su exclusivo criterio y en cualquier momento los presentes Términos y Condiciones, la Política de Privacidad y la Política de Cookies, comunicando los cambios oportunamente. Asimismo, los Usuarios deberán leer atentamente estos Términos y Condiciones al acceder a la Plataforma. En cualquier caso, la aceptación de los Términos y Condiciones será un paso previo e indispensable al acceso de los servicios y contenidos disponibles a través de la Plataforma de Amano. Asimismo, Amano se reserva la facultad de efectuar, en cualquier momento, actualizaciones, modificaciones o eliminación de información contenida en su Plataforma sin asumir responsabilidad alguna por ello. Todo cambio o modificación que Amano decida será de aplicación efectiva de manera inmediata una vez que sea publicada en la Plataforma. Asimismo, el Usuario deberá revisar en forma periódica el contenido de estos Términos y Condiciones a los fines de constatar si se han producido cambios o modificaciones, de modo tal que la continuación en su calidad de Usuario importará la conformidad con las modificaciones y cambios que decida Amano.
                                {"\n"}
                                Los Términos y Condiciones siempre exhibirán la fecha de "última actualización". Si el Usuario no acepta los Términos y Condiciones, deberá dejar de usar la Plataforma; Los diversos servicios que brindamos a través de la Plataforma son de exclusivo uso de Amano, quedando expresamente prohibido que los mismos puedan ser explotados por el Usuario de cualquier forma que fuere, por lo que no podrá revenderlos, cederlos, arrendarlos ni proporcionados de ninguna de otra forma a terceros.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                4. POLÍTICA DE PRIVACIDAD:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Consulte la política de privacidad de Amano, disponible en la Plataforma para obtener información sobre cómo Amano recopila, usa y divulga información personal de los usuarios de la Plataforma. Al ingresar y utilizar la Plataforma, el Usuario acepta el uso, recopilación y divulgación que hacemos de su información personal de acuerdo a la Política de Privacidad de la Plataforma.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                5. RESPONSABILIDAD DEL USUARIO:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                -El Usuario es responsable de todas las actividades que realice en su cuenta de la Plataforma. En caso, de que haya olvidado su nombre de usuario (username) y su clave de acceso (password) y desee recuperarla, se lo conducirá a al correo electrónico asociada a su cuenta para la recuperación de clave de acceso –contraseña. Si la dirección de correo electrónico es válida, se enviará una nueva clave de acceso por correo electrónico a la cuenta de correo electrónico en la que se puede hacer clic para restablecer la contraseña de la cuenta.
                                {"\n"}
                                -El Usuario acepta que es el único responsable por el incumplimiento de sus obligaciones en virtud de los Términos y Condiciones y por las consecuencias de dicho incumplimiento, incluida cualquier pérdida o daño que pueda sufrir Amano. Si tiene conocimiento de un uso no autorizado de su cuenta, acepta notificarnos de inmediato a sugerencias@cupones.com.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                6. OBLIGACIONES DEL USUARIO:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Los Usuarios son completamente responsables del acceso y correcto uso de su perfil y demás contenidos de la Plataforma con sujeción a la legislación vigente, así como a los principios de buena fe, a la moral, buenas costumbres y orden público. Y específicamente, adquiere el compromiso de observar diligentemente los presentes Términos y Condiciones. Los Usuarios se abstendrán de usar su perfil y el resto de contenidos de la Plataforma con fines o efectos ilícitos y que sean lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, afectar o deteriorar la Plataforma, sus contenidos y sus servicios. Asimismo, queda prohibido impedir la normal utilización o disfrute de la Plataforma a otros Usuarios. Amano no podrá ser considerada responsable editorial, y declara expresamente que no se identifica con ninguna de las opiniones que puedan emitir los Usuarios de la Plataforma, de cuyas consecuencias se hace enteramente responsable el emisor de las mismas.
                                {"\n"}
                                Quienes incumplan tales obligaciones responderán de cualquier perjuicio o daño que ocasionen. Amano no responderá de ninguna consecuencia, daño o perjuicio que pudiera derivarse de dicho acceso o uso ilícito por parte de terceros.
                                {"\n"}
                                En general, los Usuarios se comprometen, a título enunciativo y no taxativo, a:
                                {"\n"}
                                ● No alterar o modificar, total o parcialmente la Plataforma, eludiendo, desactivando o manipulando de cualquier otra las funciones o servicios del mismo;
                                {"\n"}
                                ●   No infringir los derechos de propiedad intelectual o las normas reguladoras de la protección de datos de carácter personal;
                                {"\n"}
                                ● No usar la Plataforma para injuriar, difamar, intimidar, violar la propia imagen o acosar a otros Usuarios; - No acceder a las cuentas de correo electrónico de otros Usuarios;
                                {"\n"}
                                ● No introducir virus informáticos, archivos defectuosos, o cualquier otro programa informático que pueda provocar daños o alteraciones en los contenidos o sistemas de Amano o terceras personas;
                                {"\n"}
                                ● No remitir correos electrónicos con carácter masivo y/o repetitivo a una pluralidad de personas, ni enviar direcciones de correo electrónico de terceros sin su consentimiento;
                                {"\n"}
                                ● No realizar acciones publicitarias de bienes o servicios sin el previo consentimiento de Amano.
                                {"\n"}
                                Cualquier Usuario podrá reportar a otro Usuario cuando considere que está incumpliendo las presentes Condiciones Generales, asimismo todos los Usuarios pueden informar a Amano de cualquier abuso o vulneración de las presentes Condiciones Generales, a través de siguiente correo electrónico: XX. Amano verificará este reporte, a la mayor brevedad posible, y adoptará las medidas que considere oportunas, reservándose el derecho a retirar y/o suspender a cualquier Usuario de la Plataforma por el incumplimiento de las presentes Condiciones Generales. Asimismo, Amano se reserva el derecho a retirar y/o suspender cualquier mensaje con contenido ilegal u ofensivo, sin necesidad de previo aviso o posterior notificación.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                7. BAJA DEL USUARIO:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                El Usuario podrá darse de baja de la Plataforma comunicándolo mediante un correo electrónico, enviando un correo electrónico con el asunto “BAJA AMANO “, al correo electrónico soporte@Amano.com.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                8. TARIFAS: 
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Al suscribirse y comprar la membresía de Amano, el Usuario autoriza a Amano a cobrarle periódicamente el monto correspondiente por el período contratado, ya sea mensual, trimestral, semestral o anual, etc., de acuerdo a la tarifa vigente en ese momento, la que podrá actualizarse según decisiones de Amano. La membresía se renovará automáticamente según el período por el cual el Usuario ha optado al momento de registrarse y adherido a la Plataforma, por lo que se le facturará en la misma fecha de cada período elegido. 
                                {"\n"}
                                Las tarifas de la membresía u otros servicios no son reembolsables. Las compras de membresía se contratan por períodos enteros, ya sea por mes, meses o un año, y los miembros deben abonar el monto total de la membresía contratada antes del uso de cualquier servicio que ofrece Amano. 
                                {"\n"}
                                Eliminar la aplicación de Amano desde el dispositivo móvil no constituye una solicitud de cancelación de la cuenta, y consecuentemente el Usuario seguirá siendo sujeto obligado y responsable por los montos adeudados y nos autorizará a seguir facturándole a través del Procesador de pagos. Si no resulta posible cargar su cuenta, Amano se reserva el derecho de cancelar de inmediato su membresía y el acceso a la Plataforma.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                CALIDAD Y CANTIDAD DE LA CONSUMICIÓN:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                La consumición de los beneficios al cual tendrá acceso el Usuario al comprar la membresía serán exclusivamente acceder a través del mapa de localización de Tiendas más cercanos a su ubicación actual y conocer cuales están activos a través de la Plataforma, siendo el propio Tienda el encargado de notificar cuando estará activo.
                                {"\n"}
                                Amano, es una organización de membresía privada y su compra habilita al Usuario a utilizar la Plataforma. Los privilegios de membresía permitirán contar con el beneficio de Amano y más servicios que podrán incluirse en su oportunidad y debidamente incorporados a la Plataforma.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                9. TERMINACIÓN Y CANCELACIÓN:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Sin perjuicio de cualquier disposición contenida en estos Términos y Condiciones, Amano se reserva el derecho, sin previo aviso y a su entera discreción y sin responsabilidad hacia el Usuario, de:
                                {"\n"}
                                1. Rescindir su membresía para usar la Plataforma o cualquier parte del mismo;
                                {"\n"}
                                2. Bloquear o evitar su futuro acceso y uso de todo o parte de la Plataforma, los servicios o el contenido;
                                {"\n"}
                                3. Cambiar, suspender o discontinuar cualquier aspecto de la Plataforma, los servicios o el contenido; y
                                {"\n"}
                                4. Imponer límites en la Plataforma, los servicios o el contenido.
                                {"\n"}
                                A la terminación de este Acuerdo o la cancelación de su cuenta, todas las licencias y otros derechos otorgados en virtud del presente finalizarán inmediatamente y el Usuario perderá el acceso y cesará todo uso del Servicio.
                                {"\n"}
                                Asimismo, nos reservamos el derecho, a nuestro exclusivo y absoluto criterio, de suspender temporalmente el acceso al Servicio (en todo o en parte) para: (a) mantenimiento programado o no programado; (b) los propósitos de mantener la seguridad y / o integridad de la red, el hardware o los sistemas asociados de Amano o los de sus proveedores externos; (c) la falta de pago puntual del Servicio; o (d) la violación real o sospechada de este acuerdo.
                                {"\n"}
                                Amano se reserva el derecho de cancelar su membresía con o sin causa en cualquier momento. Tener una membresía o acceso a la Plataforma no garantiza el ingreso y/o el uso del servicio en las locales y Tiendas adheridos en todo momento. Las locales y Tiendas adheridos pueden rechazar la entrada o suministro del servicio si determinan, a su entera discreción, que el Usuario viola las normas de conducta y/o asume un comportamiento indecoroso reñido con las reglas del orden y de la sana convivencia.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                10. PROPIEDAD INTELECTUAL:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                Amano es titular de todos los derechos de propiedad intelectual incluidos en la Plataforma, así como sobre los contenidos accesibles a través del mismo. Los derechos de propiedad intelectual de la Plataforma, así como las imágenes, diseño gráfico, textos, información y contenidos que se recogen en él son titularidad exclusiva de Amano, a quien corresponde el ejercicio exclusivo de los derechos de explotación de los mismos en cualquier forma.
                                {"\n"}
                                La autorización al Usuario para el acceso a la Plataforma no importará renuncia, transmisión o cesión total ni parcial sobre derechos de propiedad intelectual de Amano. Queda prohibido modificar, copiar, reproducir, cargar archivos, enviar por correo, transmitir, usar, tratar o distribuir de cualquier forma la totalidad o parte de los contenidos incluidos en la Plataforma de Amano.
                                {"\n"}
                                La Plataforma también puede contener referencias a marcas comerciales y a marcas de servicios de otras entidades, pero tales referencias son solo para fines de identificación y se utilizan con el permiso de sus respectivos propietarios. No reclamamos la propiedad ni la afiliación con marcas comerciales o marcas de servicio de terceros que aparezcan en la Plataforma. El Usuario acepta no usar ni mostrar ninguna marca comercial que no sea de su propiedad sin nuestro previo consentimiento por escrito o el consentimiento del propietario de dicha marca.
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'#4D4D4D',
                                marginVertical:Dimensions.get('window').height*0.025
                            }}>
                                11. INCUMPLIMIENTO DE LOS LOCALES O TIENDAS ADHERIDOS:
                            </Text>
                            <Text style={{
                                color:'#4D4D4D',
                                fontSize:Dimensions.get('window').width*0.04,
                                lineHeight: Dimensions.get('window').width*0.07
                            }}>
                                En caso, en que los locales o Tiendas adheridos a Amano no cumplan con el servicio ofrecido en las condiciones aquí establecidas, el Usuario deberá comunicarlo de inmediato mediante el envío de un correo electrónico a soporte@Amano.com. 
                            </Text>
                            </ScrollView >
                            <View style={{
                                    flexDirection:'row',
                                    width:Dimensions.get('window').width*0.8,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <View style={{
                                        width:Dimensions.get('window').width*0.4,
                                        paddingRight:Dimensions.get('window').width*0.0125
                                    }}>
                                        <Button block bordered
                                            onPress={this.cancelled}
                                            style={{
                                                marginBottom:Dimensions.get('window').height*0.025,
                                                borderColor:'gray'
                                        }}>
                                            <Text style={{color:"gray"}}>Cancelar</Text>
                                        </Button>
                                    </View>
                                    <View style={{
                                        width:Dimensions.get('window').width*0.4,
                                        paddingLeft:Dimensions.get('window').width*0.0125
                                    }}>
                                        <Button block 
                                            onPress={this.save}
                                            style={{
                                                backgroundColor:'#5F27A4',
                                                marginBottom:Dimensions.get('window').height*0.025
                                        }}>
                                            <Text style={{color:"white"}}>Aceptar</Text>
                                        </Button>
                                    </View>
                                </View>
                        </View>
                </View>
            </Modal>
        )
    }



    render(){
        if(this.state.register){
            return (<Spinner 
            size={Dimensions.get('window').height*0.10}
            style={{
                flex: 1,
                marginTop:Dimensions.get('window').height*0.05,
                alignSelf:'center'
            }}
            color='#FDD501'
          />)
        }
        return(
            <KeyboardAvoidingView keyboardVerticalOffset={-100} behavior="position" enabled>
            {this.modal()}
            <View style={{
                flexDirection:'column',
                alignItems:'center',
                paddingVertical:Dimensions.get('window').height*0.05,
                paddingHorizontal:Dimensions.get('window').width*0.1
            }}>
                <Image style={{
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
                    position:"absolute",
                    left: 0,
                    top: 0,
                    bottom:0,
                }} source={require('../../../../assets/background/fondo_login2.png')}/>

                <View style={styles.content_form} >
                    <Text style={styles.text}>
                        Registrar
                    </Text>
                    <Item style={styles.content_input} inlineLabel>
                        <UsuarioSvg style={styles.iconInput} />
                        <Input value={this.state.email} onChangeText={(email)=>this.setState({email})} 
                        placeholder="Ingresar Correo" style={styles.input}/>
                    </Item>
                    <Item style={styles.content_input} inlineLabel>
                        <CandadoSvg style={styles.iconInput} />
                        <Input value={this.state.pass} onChangeText={(pass)=>this.setState({pass})}
                        secureTextEntry={true} placeholder="Ingresar Contraseña" style={styles.input}/>
                    </Item>
                    <Item style={styles.content_input} inlineLabel>
                        <CandadoSvg style={styles.iconInput} />
                        <Input value={this.state.repeatPass} onChangeText={(repeatPass)=>this.setState({repeatPass})}
                        secureTextEntry={true} placeholder="Repetir Contraseña" style={styles.input}/>
                    </Item>
                    <Button 
                        onPress={this.activeModal} 
                        style={styles.btn_login} block>
                            <Text style={styles.text_btn_login}>Registrar</Text>
                    </Button>
                    <Button 
                        onPress={() => this.props.navigation.navigate('login')} 
                        transparent style={styles.btn_small}>
                            <Text style={styles.text_btn_small}>Volver a inicio de sesión</Text>
                    </Button>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    content_input:{
        marginTop:Dimensions.get('window').height*0.015,
        backgroundColor:'white',
    },
    content_form:{
        width:'100%',
        alignItems:'center',
        marginTop: Dimensions.get('window').height*0.44
    },
    input: {
        marginVertical: -10
    },
    text:{
        marginTop:Dimensions.get('window').height*0.105,
        color:"#5F27A4",
        fontSize:Dimensions.get('window').width*0.0475,
        fontWeight: "bold"
    },
    iconInput:{
        width: Dimensions.get('window').width*0.09,
        height: Dimensions.get('window').width*0.1
    },
    btn_small:{
        alignSelf:'center',
        height:Dimensions.get('window').height*0.06
    },
    text_btn_small:{
        fontSize:Dimensions.get('window').width*0.034,
        color:"#FFFFFF"
    },
    btn_login:{
        backgroundColor:'#5F27A4',
        marginTop:Dimensions.get('window').height*0.015
    },
    text_btn_login:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').width*0.04
    }
});
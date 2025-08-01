
// Note, the below is an example of how to get the viewer
// working in an emmulated non-browser environment.
//globalThis.process = { env: { PLATFORM: 'web' } }

import {initViewer} from '@bldrs-ai/conway/compiled/src/rendering/threejs/html_viewer.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { ShadowQuality, SimpleViewerScene } from '@bldrs-ai/conway/compiled/src/rendering/threejs/simple_viewer_scene.js'
import SceneObject from '@bldrs-ai/conway/compiled/src/rendering/threejs/scene_object'
import { versionString } from '@bldrs-ai/conway/compiled/src'

// Note, the below is an exmaple of how to set the module prefix
// for the conway-geom package when using a non-default
// location for the wasm distributions.
// setModulePrefix( '/dependencies/conway-geom/Dist/' )

interface ViewerScene {
    ambientOcclusion: boolean
    hasAmbientLight: boolean
    shadowsEnabled: boolean
    shadowQuality: ShadowQuality
    limitCSGDepth: boolean
    maxCSGDepth: number
    load( buffer: ArrayBuffer ): Promise<void>
    loadEquirectangularEnvironmentMapHDR( url: string ): Promise<void>
    onload?: ( scene: SimpleViewerScene, object: SceneObject ) => void
}

window.onload = async () => {

    // Note - here you can choose to receive the scene
    // from the initViewer function if you want to interact with
    // the scene directly.
    const scene = initViewer() as ViewerScene

    //scene.ambientOcclusion =

    const gui = new GUI()

    // Add version string as a non-interactive label
    const versionInfo = { version: versionString.substring( versionString.indexOf( 'v' ) ) }
    const versionController = gui.add( versionInfo, 'version' ).name( 'Conway Version' ).disable()

    // Apply fullbright style directly
    versionController.domElement.classList.remove( 'disabled' )
    versionController.domElement.style.color = '#FFFFFF'
    versionController.$input.style.color = '#FFFFFF'

    const loaderFolder = gui.addFolder( 'Loader' )

    loaderFolder.add( scene, 'limitCSGDepth').name( 'Limit CSG Depth' )
    loaderFolder.add( scene, 'maxCSGDepth' ).name( 'Max CSG Depth' )
    
    const renderingFolder = gui.addFolder( 'Rendering' )
    
    renderingFolder.add( scene, 'ambientOcclusion' ).name( 'Ambient Occlusion' )
    renderingFolder.add( scene, 'hasAmbientLight' ).name( 'Has Ambient Light' )
    renderingFolder.add( scene, 'shadowsEnabled' ).name( 'Shadows Enabled' )
    renderingFolder.add( scene, 'shadowQuality', {
        Low: ShadowQuality.LOW,
        Medium: ShadowQuality.MEDIUM,
        High: ShadowQuality.HIGH 
    } ).name( 'Shadow Quality' )

    const updateUI = () => {
        
        gui.controllersRecursive().forEach( ( controller ) => {
        
            controller.updateDisplay()
        })
    }

    const loadModelButton =
        document.getElementById( 'loadModel' ) as HTMLInputElement
    const loadEnvinvironmentMapButton =
        document.getElementById( 'loadEnvironmentMap' ) as HTMLInputElement

    loadModelButton?.addEventListener( 
        'change',
        async () => {

            console.log( loadModelButton.files )

            if ( loadModelButton.files !== null && loadModelButton.files.length > 0 ) {

                const file = loadModelButton.files[ 0 ]
                
                const buffer = await file.arrayBuffer()

                await scene.load( buffer )
            }

        }, 
        false )

    loadEnvinvironmentMapButton?.addEventListener( 
        'change',
        () => {

            console.log( loadEnvinvironmentMapButton.files )

            if ( loadEnvinvironmentMapButton.files !== null &&
                loadEnvinvironmentMapButton.files.length > 0 ) {

                const file = loadEnvinvironmentMapButton.files[ 0 ]
                const fileReader = new FileReader()           

                fileReader.addEventListener(
                    'load',
                    async () => {

                        await scene.loadEquirectangularEnvironmentMapHDR( fileReader.result as string )

                        scene.hasAmbientLight = false

                        updateUI()
                    },
                    false
                )

                fileReader.readAsDataURL( file)
            }

        }, 
        false )

    const buttonController = {

        loadModel: () => {
        
            loadModelButton?.click()
        },

        loadEnvinvironmentMap: () => {
        
            loadEnvinvironmentMapButton?.click()
        }
    }

    gui.add( buttonController, 'loadModel' ).name( 'Load Model')
    gui.add( buttonController, 'loadEnvinvironmentMap' ).name( 'Load Environment Map' )

    scene.hasAmbientLight = true

    console.log( 'Viewer initialised' )
}

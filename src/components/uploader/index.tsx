/** @jsx customElements */
import { SFC, useContext, ChangeEvent } from 'react'
import Context, { MainContext } from '../../store/context'
import fileToJson from '../../utils/file-to-json'
import customElements from '../../lib/pragma'
import cloud from '../../svg/cloud.svg'
import './index.css'

const Uploader: SFC = function () {
  const { ubigeo, setUbigeo }: MainContext = useContext(Context)

  const onFileSelect = async function (e: ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target.files
    if (files) {
      const txt: File = files[0]
      try {
        const dataJson = await fileToJson(txt)
        console.log(dataJson)
        setUbigeo(dataJson)
      } catch (e) {
        alert(e.message)
      }
    }
  }

  return (
    <div>
      <input id="upload" type="file" onChange={onFileSelect} />
      {
        Object.keys(ubigeo).length ? (
          <div>
            <h3>Reporte de Ubigeo</h3>
            <ubigeo-table
              rows={ubigeo}
            />
          </div>
        ) : (
          <label htmlFor="upload" className="upload-area">
            <img src={cloud} alt="upload" />
            <p>Suelta o haz click aquí para subir</p>
          </label>
        )
      }
    </div>
  )
}

export default Uploader

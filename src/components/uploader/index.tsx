/** @jsx customElements */
import { SFC, useContext, ChangeEvent } from 'react'
import Context, { MainContext } from '../../store/context'
import fileToJson from '../../utils/file-to-json'
import DragnDrop from '../../lib/dragndrop'
import customElements from '../../lib/pragma'
import cloud from '../../svg/cloud.svg'
import './index.css'

const Uploader: SFC = function () {
  const { ubigeo, setUbigeo }: MainContext = useContext(Context)

  const onFileDrop = async function(file: File) {
    putInTable(file)
  }

  const onFileSelect = async function (e: ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target.files
    if (files) {
      const file: File = files[0]
      putInTable(file)
    }
  }

  const putInTable = async function (file: File) {
    try {
      const dataJson = await fileToJson(file)
      setUbigeo(dataJson)
    } catch (e) {
      alert(e.message)
    }
  }

  const IS_DESKTOP = matchMedia('(min-width: 980px').matches
  
  if (IS_DESKTOP) {
    return (
      <div>
        <input id="upload" type="file" onChange={onFileSelect} />
        <label
          htmlFor="upload"
          className="upload-area"
          onDragOver={DragnDrop.onDragOver}
          onDrop={e => {
            DragnDrop.onDrop(e, onFileDrop)
          }}
          >
          <img src={cloud} alt="upload" />
          <p>Suelta o haz click aquí para subir</p>
        </label>
        {
          Object.keys(ubigeo).length ? (
            <div>
              <h3>Reporte de Ubigeo</h3>
              <ubigeo-table
                rows={ubigeo}
              />
            </div>
          ) : null
        }
      </div>
    )
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
            <p>Haz click aquí para subir</p>
          </label>
        )
      }
    </div>
  )
}

export default Uploader

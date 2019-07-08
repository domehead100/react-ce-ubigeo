export interface Department {
  code: string
  name: string
  provinces: Province[]
}

export interface Province {
  code: string
  name: string
  districts: District[]
}

export interface District {
  code: string
  name: string
}

export interface Location {
  code: string
  name: string
}

const regex= /(?<code>[0-9]+)\s+(?<name>[a-zA-Z\s]+)/

function fileToJson(file: File): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    if (file.type !== 'text/plain') {
      throw new Error('Solo se permiten archivos de texto plano')
    }
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onloadend = function() {
      parseContent(this.result as string, resolve)
    }
  })
}

async function parseContent (rawText: string, cb: (data: Department[]) => void) {
  const lines = rawText.replace(/"/g, '').split('\n')

  const toReturn: Department[] = []

  for (const line of lines) {
    const [departmentGroup, provinceGroup, districtGroup] = line.split('/')

    const department = await groupToData(departmentGroup)
    const province = await groupToData(provinceGroup)
    const district = await groupToData(districtGroup)

    if (department) {
      const hasDepartment = toReturn.find((d: Department) => d.code === department.code)
      if (!hasDepartment) {
        toReturn.push({
          ...department,
          provinces: []
        })
      }
    }

    if (department && province) {
      const _department = toReturn.find((d: Department) => d.code === department.code) as Department
      const _province = _department.provinces.find((p: Province) => p.code === province.code)
      if (!_province) {
        _department.provinces.push({
          ...province,
          districts: []
        })
      }
    }

    if (department && province && district) {
      const _department = toReturn.find((d: Department) => d.code === department.code) as Department
      const _province = _department.provinces.find((p: Province) => p.code === province.code) as Province
      const _district = _province.districts.find((d: District) => d.code === district.code) as District

      if (!_district) {
        _province.districts.push(district)
      }
    }
  }

  cb(toReturn)
}

function groupToData(group: string): Promise<Location | null> {
  const regexResult = regex.exec(group)

  return new Promise((resolve) => {
    if (regexResult) {
      const { code, name } = regexResult.groups as Record<string, any>
      const location: Location = { code, name }
      resolve(location)
    } else {
      resolve(void 0)
    }
  })
}

export default fileToJson
